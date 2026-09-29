import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../theme.dart';

/// Port of `GameOfLife.tsx` — Conway's Game of Life on a 30x60 grid,
/// seeded at 30% density and advanced every 100 ms.
class GameOfLife extends StatefulWidget {
  const GameOfLife({super.key});

  static const int rows = 30;
  static const int cols = 60;

  @override
  State<GameOfLife> createState() => _GameOfLifeState();
}

class _GameOfLifeState extends State<GameOfLife> {
  static const int _tickMs = 100;
  static const double _cell = 4;
  static const double _gap = 1;

  late List<List<int>> _grid = _seed();
  Timer? _timer;

  List<List<int>> _seed() {
    final rand = math.Random();
    return List.generate(
      GameOfLife.rows,
      (_) => List.generate(
        GameOfLife.cols,
        (_) => rand.nextDouble() > 0.7 ? 1 : 0,
      ),
    );
  }

  static const _directions = <List<int>>[
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  void _step() {
    final current = _grid;
    setState(() {
      _grid = List.generate(GameOfLife.rows, (i) {
        return List.generate(GameOfLife.cols, (j) {
          var neighbors = 0;
          for (final d in _directions) {
            final ni = i + d[0];
            final nj = j + d[1];
            if (ni >= 0 &&
                ni < GameOfLife.rows &&
                nj >= 0 &&
                nj < GameOfLife.cols) {
              neighbors += current[ni][nj];
            }
          }
          final cell = current[i][j];
          if (cell == 1 && (neighbors < 2 || neighbors > 3)) return 0;
          if (cell == 0 && neighbors == 3) return 1;
          return cell;
        });
      });
    });
  }

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(
      const Duration(milliseconds: _tickMs),
      (_) => _step(),
    );
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: const Color(0xFF222222),
        borderRadius: BorderRadius.circular(4),
        boxShadow: const [BoxShadow(color: Color(0x80000000), blurRadius: 20)],
      ),
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: CustomPaint(
          size: Size(
            GameOfLife.cols * (_cell + _gap) - _gap,
            GameOfLife.rows * (_cell + _gap) - _gap,
          ),
          painter: _LifePainter(_grid),
        ),
      ),
    );
  }
}

class _LifePainter extends CustomPainter {
  _LifePainter(this.grid);

  final List<List<int>> grid;

  @override
  void paint(Canvas canvas, Size size) {
    final live = Paint()..color = ArtitsColors.active;
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        if (grid[i][j] != 1) continue;
        canvas.drawRect(Rect.fromLTWH(j * 5, i * 5, 4, 4), live);
      }
    }
  }

  @override
  bool shouldRepaint(_LifePainter old) => true;
}
