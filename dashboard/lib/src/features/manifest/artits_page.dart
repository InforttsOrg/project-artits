import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../data/memory_graph_data.dart';
import '../../theme.dart';
import '../game_of_life/game_of_life.dart';
import '../memory_graph/memory_graph_3d.dart';
import '../terminal/artits_terminal.dart';

/// Port of `App.tsx`.
class ArtitsPage extends StatefulWidget {
  const ArtitsPage({super.key});

  @override
  State<ArtitsPage> createState() => _ArtitsPageState();
}

class _ArtitsPageState extends State<ArtitsPage> {
  final ScrollController _scroll = ScrollController();
  final GlobalKey _graphKey = GlobalKey();
  GraphNode? _selected;

  @override
  void dispose() {
    _scroll.dispose();
    super.dispose();
  }

  void _selectById(String id) {
    final node = initialNodes.where((n) => n.id == id).firstOrNull;
    if (node == null) return;
    setState(() => _selected = node);
    _scrollToGraph();
  }

  void _scrollToGraph() {
    final ctx = _graphKey.currentContext;
    if (ctx == null) return;
    Scrollable.ensureVisible(
      ctx,
      duration: const Duration(milliseconds: 500),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          CustomScrollView(
            controller: _scroll,
            slivers: [
              SliverToBoxAdapter(child: _topBar(context)),
              SliverToBoxAdapter(
                child: _section(label: 'IDENTITY_MANIFEST', child: _identity()),
              ),
              SliverToBoxAdapter(
                child: _section(
                  label: 'CELLULAR_AUTOMATA // CONWAY_GOL',
                  child: Center(child: const GameOfLife()),
                ),
              ),
              SliverToBoxAdapter(
                child: _section(
                  label: 'PRODUCTION_SYSTEMS (LIVE)',
                  child: _productionSystems(),
                ),
              ),
              SliverToBoxAdapter(
                key: _graphKey,
                child: _section(
                  label: 'MEMORY_GRAPH_3D // SKILLS_AND_PROJECTS',
                  child: _memoryGraph(),
                ),
              ),
              SliverToBoxAdapter(
                child: _section(
                  label: 'GLOBAL_CONNECTIVITY',
                  child: _connectivity(context),
                ),
              ),
              SliverToBoxAdapter(child: _footer()),
            ],
          ),
          const ArtitsTerminal(),
        ],
      ),
    );
  }

  Widget _section({required String label, required Widget child}) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(24, 48, 24, 48),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: artitsMono.copyWith(
              fontSize: 9,
              color: ArtitsColors.steelDim,
            ),
          ),
          const SizedBox(height: 20),
          child,
        ],
      ),
    );
  }

  Widget _topBar(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 20, 24, 0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 8,
                height: 8,
                decoration: const BoxDecoration(
                  color: ArtitsColors.active,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'SYSTEM_OPERATIONAL // SAHIL_RATHEE // @rttss-sahil',
                  style: artitsMono.copyWith(fontSize: 9),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 32,
            children: [
              for (final s in socials.take(3)) _link(s, fontSize: 9),
              _link(
                const SocialLink('RESUME.PDF', '/Sahil-Rathee-Resume.pdf'),
                fontSize: 9,
                color: ArtitsColors.active,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _identity() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          crossAxisAlignment: WrapCrossAlignment.start,
          children: [
            Text(
              'SAHIL\nRATHEE',
              style: TextStyle(
                fontFamily: 'Outfit',
                fontSize: 56,
                height: 1.0,
                fontWeight: FontWeight.w800,
                letterSpacing: -2,
                color: ArtitsColors.fg,
              ),
            ),
            Padding(
              padding: EdgeInsets.only(left: 16, top: 8),
              child: Text(
                'OPEN_TO_WORK',
                style: TextStyle(
                  fontFamily: 'Outfit',
                  fontSize: 16,
                  color: ArtitsColors.active,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 32),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 700),
          child: Text(
            'Backend & Infrastructure Engineer specializing in Go, Kubernetes, '
            'real-time event streaming, and AI-agent orchestration. Known '
            'across the stack as rttss-sahil.',
            style: TextStyle(fontSize: 19, height: 1.4, color: ArtitsColors.fg),
          ),
        ),
        const SizedBox(height: 16),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 700),
          child: Text(
            'Go • Python • Kubernetes • Terraform • Ansible • NATS • PostgreSQL '
            '• Cloudflare Workers',
            style: const TextStyle(
              fontSize: 15,
              height: 1.6,
              color: ArtitsColors.steel,
            ),
          ),
        ),
      ],
    );
  }

  Widget _productionSystems() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final columns = constraints.maxWidth > 900
            ? 2
            : constraints.maxWidth > 600
            ? 2
            : 1;
        return GridView.count(
          crossAxisCount: columns,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 16,
          crossAxisSpacing: 16,
          childAspectRatio: 2.2,
          children: [for (final card in productionSystems) _projectCard(card)],
        );
      },
    );
  }

  Widget _projectCard(ProjectCard card) {
    return Semantics(
      button: true,
      label: '${card.title} — ${card.description}',
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: () => _selectById(card.id),
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: ArtitsColors.panel,
              border: Border.all(
                color: ArtitsColors.sky.withValues(alpha: 0.08),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  card.title,
                  style: artitsMono.copyWith(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    color: ArtitsColors.fg,
                  ),
                ),
                const SizedBox(height: 8),
                Expanded(
                  child: Text(
                    card.description,
                    style: const TextStyle(
                      fontSize: 12,
                      height: 1.5,
                      color: ArtitsColors.steel,
                    ),
                  ),
                ),
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: [
                    for (final tag in card.tags)
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 6,
                          vertical: 2,
                        ),
                        decoration: BoxDecoration(
                          border: Border.all(
                            color: ArtitsColors.sky.withValues(alpha: 0.3),
                          ),
                        ),
                        child: Text(
                          tag,
                          style: artitsMono.copyWith(
                            fontSize: 8,
                            color: ArtitsColors.sky,
                          ),
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _memoryGraph() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final stacked = constraints.maxWidth < 800;
        final graph = Container(
          height: 500,
          decoration: BoxDecoration(
            color: ArtitsColors.panel,
            border: Border.all(color: ArtitsColors.sky.withValues(alpha: 0.08)),
          ),
          child: MemoryGraph3D(
            activeNode: _selected,
            onSelectNode: (n) => setState(() => _selected = n),
          ),
        );
        final details = _graphDetails();
        if (stacked) {
          return Column(children: [graph, const SizedBox(height: 16), details]);
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(flex: 3, child: graph),
            const SizedBox(width: 16),
            Expanded(flex: 2, child: details),
          ],
        );
      },
    );
  }

  Widget _graphDetails() {
    final n = _selected;
    return Container(
      height: 500,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: ArtitsColors.panel,
        border: Border.all(color: ArtitsColors.sky.withValues(alpha: 0.08)),
      ),
      child: n == null
          ? const Center(
              child: Text(
                '[SELECT_NODE_IN_3D_GRAPH_TO_QUERY_DOCUMENTATION]',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: 'monospace',
                  fontSize: 10,
                  color: ArtitsColors.steelDim,
                ),
              ),
            )
          : SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    n.type == GraphNodeType.project
                        ? 'PROJECT_DOCUMENTATION'
                        : 'SKILL_METRICS',
                    style: artitsMono.copyWith(
                      fontSize: 9,
                      color: ArtitsColors.steelDim,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    n.label,
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: n.type == GraphNodeType.project
                          ? ArtitsColors.fg
                          : ArtitsColors.active,
                    ),
                  ),
                  if (n.status != null) ...[
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: ArtitsColors.sky.withValues(alpha: 0.3),
                        ),
                      ),
                      child: Text(
                        'STATUS: ${n.status}',
                        style: artitsMono.copyWith(
                          fontSize: 8,
                          color: ArtitsColors.sky,
                        ),
                      ),
                    ),
                  ],
                  const SizedBox(height: 20),
                  Text(
                    n.desc,
                    style: artitsMono.copyWith(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      height: 1.4,
                      color: ArtitsColors.fg,
                    ),
                  ),
                  const SizedBox(height: 18),
                  Text(
                    n.details,
                    style: const TextStyle(
                      fontSize: 12,
                      height: 1.6,
                      color: ArtitsColors.steel,
                    ),
                  ),
                  if (n.link != null) ...[
                    const SizedBox(height: 20),
                    _link(
                      SocialLink('ACCESS LIVE PLATFORM →', n.link!),
                      fontSize: 10,
                      color: ArtitsColors.sky,
                    ),
                  ],
                  if (n.localPath != null) ...[
                    const SizedBox(height: 24),
                    Text.rich(
                      TextSpan(
                        text: 'MONOREPO TARGET: ',
                        children: [
                          TextSpan(
                            text: './${n.localPath}',
                            style: const TextStyle(color: ArtitsColors.steel),
                          ),
                        ],
                      ),
                      style: artitsMono.copyWith(
                        fontSize: 9,
                        color: ArtitsColors.steelDim,
                      ),
                    ),
                  ],
                ],
              ),
            ),
    );
  }

  Widget _connectivity(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final columns = constraints.maxWidth > 800 ? 5 : 2;
        return GridView.count(
          crossAxisCount: columns,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 1.4,
          children: [
            for (final s in socials)
              Semantics(
                button: true,
                label: s.name,
                child: MouseRegion(
                  cursor: SystemMouseCursors.click,
                  child: GestureDetector(
                    onTap: () => _open(s.url),
                    child: Container(
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: ArtitsColors.panel,
                        border: Border.all(
                          color: ArtitsColors.sky.withValues(alpha: 0.08),
                        ),
                      ),
                      child: Text(
                        s.name,
                        style: artitsMono.copyWith(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: ArtitsColors.fg,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
          ],
        );
      },
    );
  }

  Widget _footer() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(color: ArtitsColors.sky.withValues(alpha: 0.08)),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            '@rttss-sahil // SYSTEM_9.2_PRODUCTION_STABLE',
            style: artitsMono.copyWith(
              fontSize: 9,
              color: ArtitsColors.steelDim,
            ),
          ),
          Text(
            'EST. 2018 // BASED_IN_NEW_DELHI',
            style: artitsMono.copyWith(
              fontSize: 9,
              color: ArtitsColors.steelDim,
            ),
          ),
        ],
      ),
    );
  }

  static Future<void> _open(String url) async {
    final uri = Uri.parse(url);
    if (uri.hasScheme) {
      await launchUrl(uri, webOnlyWindowName: '_blank');
    } else {
      // Same-origin asset (the resume PDF).
      await launchUrl(Uri.base.resolve(url), webOnlyWindowName: '_blank');
    }
  }
}

Widget _link(SocialLink s, {required double fontSize, Color? color}) {
  return Semantics(
    link: true,
    label: s.name,
    child: MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => _ArtitsPageState._open(s.url),
        child: Text(
          s.name,
          style: artitsMono.copyWith(
            fontSize: fontSize,
            color: color ?? ArtitsColors.fg,
          ),
        ),
      ),
    ),
  );
}
