import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../data/memory_graph_data.dart';
import '../../theme.dart';

/// A node placed on the Fibonacci sphere, plus its projected screen position.
class _Placed {
  _Placed({
    required this.node,
    required this.x,
    required this.y,
    required this.z,
    required this.px,
    required this.py,
    required this.pSize,
    required this.depth,
  });

  final GraphNode node;
  final double x, y, z;
  final double px, py;
  final double pSize;

  /// Rotated depth, used for both sorting and depth-faded alpha.
  final double depth;
}

/// Interactive port of `MemoryGraph3D.tsx`.
///
/// The React original drew straight to a `<canvas>` with a `requestAnimationFrame`
/// loop. Here the same projection maths runs inside a [CustomPainter], which
/// keeps the identical output while letting Flutter own the gesture handling.
class MemoryGraph3D extends StatefulWidget {
  const MemoryGraph3D({super.key, this.onSelectNode, this.activeNode});

  final ValueChanged<GraphNode>? onSelectNode;
  final GraphNode? activeNode;

  @override
  State<MemoryGraph3D> createState() => _MemoryGraph3DState();
}

class _MemoryGraph3DState extends State<MemoryGraph3D>
    with SingleTickerProviderStateMixin {
  // Same values as the React component: radius, field of view, base node size.
  static const double _radius = 170;
  static const double _fov = 350;
  static const double _nodeBaseSize = 6;
  static const double _hoverRange = 15;
  static const double _autoRotateX = 0.005;
  static const double _autoRotateY = 0.005;

  late final AnimationController _ticker = AnimationController(
    vsync: this,
    duration: const Duration(days: 1),
  )..repeat();

  // Rotation angles, exactly like the React `angleRef`.
  //
  // Auto-rotation is derived from ticker time rather than incremented inside
  // `_project`, because `_project` runs both from the painter and from pointer
  // hit-testing. Accumulating on each call would make the sphere spin faster
  // whenever the pointer moved over it.
  double _dragAngleX = 0;
  double _dragAngleY = 0;

  double _elapsed() => _ticker.lastElapsedDuration!.inMicroseconds / 1e6;

  double get _angleX => _dragAngleX + _autoRotateX * 0.5 * _elapsed();

  double get _angleY => _dragAngleY + _autoRotateY * 0.5 * _elapsed();

  // Drag state.
  bool _isDown = false;
  double _dragStartX = 0;
  double _dragStartY = 0;
  String? _hoveredId;

  // Node coordinates on the Fibonacci lattice, filled in by _seedCoordinates.
  final List<double> _xs = [];
  final List<double> _ys = [];
  final List<double> _zs = [];

  /// Fibonacci lattice so nodes are evenly distributed on the sphere.
  ///
  /// Same formula as the React original:
  ///   phi = acos(1 - 2 * (i + 0.5) / count)
  ///   theta = pi * (1 + sqrt(5)) * (i + 0.5)
  void _seedCoordinates() {
    final count = initialNodes.length;
    for (var i = 0; i < count; i++) {
      final phi = math.acos(1 - 2 * (i + 0.5) / count);
      final theta = math.pi * (1 + math.sqrt(5)) * (i + 0.5);
      _xs.add(_radius * math.cos(theta) * math.sin(phi));
      _ys.add(_radius * math.sin(theta) * math.sin(phi));
      _zs.add(_radius * math.cos(phi));
    }
  }

  @override
  void initState() {
    super.initState();
    _seedCoordinates();
  }

  @override
  void dispose() {
    _ticker.dispose();
    super.dispose();
  }

  void _onPointerDown(PointerDownEvent e) {
    setState(() {
      _isDown = true;
      _dragStartX = e.localPosition.dx;
      _dragStartY = e.localPosition.dy;
    });
  }

  void _onPointerMove(PointerMoveEvent e, Size size) {
    setState(() {
      if (_isDown) {
        final dx = e.localPosition.dx - _dragStartX;
        final dy = e.localPosition.dy - _dragStartY;
        _dragAngleY += dx * 0.007;
        _dragAngleX += dy * 0.007;
        _dragStartX = e.localPosition.dx;
        _dragStartY = e.localPosition.dy;
      }
      _hoveredId = _hitTest(e.localPosition, size);
    });
  }

  void _onPointerUp() => setState(() => _isDown = false);

  void _onPointerLeave() => setState(() {
    _isDown = false;
    _hoveredId = null;
  });

  void _onClick() {
    final id = _hoveredId;
    if (id == null) return;
    final match = initialNodes.where((n) => n.id == id).firstOrNull;
    if (match != null) widget.onSelectNode?.call(match);
  }

  String? _hitTest(Offset local, Size size) {
    final projected = _project(size);
    String? closest;
    var minDistance = _hoverRange;
    for (final p in projected) {
      final d = (Offset(p.px, p.py) - local).distance;
      if (d < minDistance) {
        minDistance = d;
        closest = p.node.id;
      }
    }
    return closest;
  }

  List<_Placed> _project(Size size) {
    final angleX = _angleX;
    final angleY = _angleY;
    final cosX = math.cos(angleX);
    final sinX = math.sin(angleX);
    final cosY = math.cos(angleY);
    final sinY = math.sin(angleY);
    final centerX = size.width / 2;
    final centerY = size.height / 2;

    final out = <_Placed>[];
    for (var i = 0; i < initialNodes.length; i++) {
      final x1 = _xs[i] * cosY - _zs[i] * sinY;
      final z1 = _zs[i] * cosY + _xs[i] * sinY;
      final y2 = _ys[i] * cosX - z1 * sinX;
      final z2 = z1 * cosX + _ys[i] * sinX;
      final scale = _fov / (_fov + z2);
      out.add(
        _Placed(
          node: initialNodes[i],
          x: _xs[i],
          y: _ys[i],
          z: _zs[i],
          px: x1 * scale + centerX,
          py: y2 * scale + centerY,
          pSize: _nodeBaseSize * scale,
          depth: z2,
        ),
      );
    }
    return out;
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final size = Size(constraints.maxWidth, constraints.maxHeight);
        return MouseRegion(
          onHover: (e) =>
              _onPointerMove(PointerMoveEvent(position: e.localPosition), size),
          onExit: (_) => _onPointerLeave(),
          child: GestureDetector(
            behavior: HitTestBehavior.opaque,
            onPanStart: (_) =>
                _onPointerDown(PointerDownEvent(position: Offset.zero)),
            onPanUpdate: (d) => _onPointerMove(
              PointerMoveEvent(position: d.localPosition),
              size,
            ),
            onPanEnd: (_) => _onPointerUp(),
            onTap: _onClick,
            onSecondaryTap: _onPointerUp,
            child: Stack(
              children: [
                Positioned.fill(
                  child: RepaintBoundary(
                    child: AnimatedBuilder(
                      animation: _ticker,
                      builder: (context, _) => CustomPaint(
                        painter: _GraphPainter(
                          nodes: _project(size),
                          activeId: widget.activeNode?.id,
                          hoveredId: _hoveredId,
                        ),
                      ),
                    ),
                  ),
                ),
                Positioned(
                  left: 10,
                  bottom: 10,
                  child: IgnorePointer(
                    child: Text(
                      'DRAG TO ROTATE // CLICK TO PREVIEW NODE // DEPTH: '
                      'FIBONACCI_SPHERE',
                      style: artitsMono.copyWith(
                        fontSize: 8,
                        color: ArtitsColors.steelDim,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _GraphPainter extends CustomPainter {
  _GraphPainter({
    required this.nodes,
    required this.activeId,
    required this.hoveredId,
  });

  final List<_Placed> nodes;
  final String? activeId;
  final String? hoveredId;

  /// Depth-fade curve copied from the React render loop.
  static double _alpha(double depth) =>
      math.max(0.2, math.min(1.0, 1 - (depth + 170) / 340));

  @override
  void paint(Canvas canvas, Size size) {
    _drawGrid(canvas, size);

    final byId = <String, _Placed>{for (final n in nodes) n.node.id: n};

    // Links.
    for (final link in initialLinks) {
      final a = byId[link.source];
      final b = byId[link.target];
      if (a == null || b == null) continue;

      final relatedToActive =
          activeId != null && (activeId == a.node.id || activeId == b.node.id);
      final relatedToHover =
          hoveredId != null &&
          (hoveredId == a.node.id || hoveredId == b.node.id);

      final avgZ = (a.depth + b.depth) / 2;
      final depthAlpha = math.max(0.05, math.min(0.6, 1 - (avgZ + 170) / 340));

      final Paint paint;
      if (relatedToActive) {
        paint = Paint()
          ..color = const Color(0xB300F3FF)
          ..strokeWidth = 1.5;
      } else if (relatedToHover) {
        paint = Paint()
          ..color = const Color(0x800066FF)
          ..strokeWidth = 1.2;
      } else {
        paint = Paint()
          ..color = ArtitsColors.sky.withValues(alpha: depthAlpha * 0.15)
          ..strokeWidth = 0.5;
      }

      canvas.drawLine(Offset(a.px, a.py), Offset(b.px, b.py), paint);
    }

    // Nodes, back to front.
    final sorted = [...nodes]..sort((a, b) => b.depth.compareTo(a.depth));
    for (final n in sorted) {
      final isActive = activeId == n.node.id;
      final isHovered = hoveredId == n.node.id;
      final alpha = _alpha(n.depth);
      final center = Offset(n.px, n.py);
      final radius =
          n.pSize *
          (isActive
              ? 1.5
              : isHovered
              ? 1.25
              : 1);

      final Paint fill;
      if (isActive) {
        fill = Paint()..color = ArtitsColors.active;
      } else if (isHovered) {
        fill = Paint()..color = ArtitsColors.sonarBlue;
      } else {
        fill = Paint()
          ..color =
              (n.node.type == GraphNodeType.project
                      ? ArtitsColors.fg
                      : ArtitsColors.steel)
                  .withValues(alpha: alpha);
      }

      if (isActive || isHovered) {
        canvas.drawCircle(
          center,
          radius,
          Paint()
            ..color = fill.color.withValues(alpha: 0.35)
            ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 10),
        );
      }
      canvas.drawCircle(center, radius, fill);

      if (isActive) {
        canvas.drawCircle(
          center,
          n.pSize * 0.6,
          Paint()..color = ArtitsColors.panel,
        );
      }

      _drawLabel(canvas, n, center, isActive, isHovered, alpha);
    }
  }

  void _drawLabel(
    Canvas canvas,
    _Placed n,
    Offset center,
    bool isActive,
    bool isHovered,
    double alpha,
  ) {
    final fontSize = isActive
        ? 11.0
        : isHovered
        ? 10.0
        : 9.0;
    final painter = TextPainter(
      text: TextSpan(
        text: n.node.label,
        style: TextStyle(
          fontFamily: 'JetBrains Mono',
          fontFamilyFallback: const ['monospace'],
          fontSize: fontSize,
          fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
          color: isActive
              ? ArtitsColors.active
              : isHovered
              ? ArtitsColors.sky
              : ArtitsColors.titanium.withValues(alpha: alpha * 0.8),
        ),
      ),
      textDirection: TextDirection.ltr,
      textAlign: TextAlign.center,
    )..layout();
    painter.paint(
      canvas,
      Offset(
        center.dx - painter.width / 2,
        center.dy - (n.pSize + 6) - painter.height / 2,
      ),
    );
  }

  void _drawGrid(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0x08FFFFFF)
      ..strokeWidth = 1;
    const gridSize = 30.0;
    for (var x = 0.0; x < size.width; x += gridSize) {
      canvas.drawLine(Offset(x, 0), Offset(x, size.height), paint);
    }
    for (var y = 0.0; y < size.height; y += gridSize) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), paint);
    }
  }

  @override
  bool shouldRepaint(_GraphPainter old) {
    if (old.activeId != activeId || old.hoveredId != hoveredId) return true;
    if (old.nodes.length != nodes.length) return true;
    // The sphere rotates continuously, so the projected positions differ on
    // every frame. Comparing them is what keeps the animation actually
    // painting; a constant `false` here would freeze the graph.
    for (var i = 0; i < nodes.length; i++) {
      if ((old.nodes[i].px - nodes[i].px).abs() > 0.01 ||
          (old.nodes[i].py - nodes[i].py).abs() > 0.01) {
        return true;
      }
    }
    return false;
  }
}
