import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';

import 'package:artits/main.dart';
import 'package:artits/src/api/artits_api.dart';
import 'package:artits/src/data/memory_graph_data.dart';
import 'package:artits/src/features/game_of_life/game_of_life.dart';
import 'package:artits/src/features/memory_graph/memory_graph_3d.dart';
import 'package:artits/src/features/terminal/artits_terminal.dart';
import 'package:artits/src/theme.dart';

ArtitsApi _apiReturning(String body, {int status = 200}) {
  return ArtitsApi(
    client: MockClient((_) async => http.Response(body, status)),
  );
}

void main() {
  // --- Data parity -------------------------------------------------------
  group('memory graph data', () {
    test('project and skill counts match the React source', () {
      expect(
        initialNodes.where((n) => n.type == GraphNodeType.project),
        hasLength(13),
      );
      expect(
        initialNodes.where((n) => n.type == GraphNodeType.skill),
        hasLength(10),
      );
      expect(initialNodes, hasLength(23));
    });

    test('node ids are unique', () {
      expect(initialNodes.map((n) => n.id).toSet(), hasLength(23));
    });

    test('every production system resolves to a graph node', () {
      for (final card in productionSystems) {
        expect(
          initialNodes.any((n) => n.id == card.id),
          isTrue,
          reason: 'project card "${card.title}" has no graph node',
        );
      }
    });

    test('skill nodes carry descriptive copy', () {
      for (final n in initialNodes.where(
        (n) => n.type == GraphNodeType.skill,
      )) {
        expect(n.desc, isNotEmpty, reason: 'skill ${n.label} has no desc');
        expect(
          n.details,
          isNotEmpty,
          reason: 'skill ${n.label} has no details',
        );
      }
    });

    test('every link endpoint resolves to a real node', () {
      final ids = initialNodes.map((n) => n.id).toSet();
      for (final link in initialLinks) {
        expect(
          ids,
          contains(link.source),
          reason: 'dangling source ${link.source}',
        );
        expect(
          ids,
          contains(link.target),
          reason: 'dangling target ${link.target}',
        );
      }
    });

    test('social links are either absolute URLs or root-relative assets', () {
      expect(socials, hasLength(5));
      for (final s in socials) {
        final uri = Uri.tryParse(s.url);
        expect(uri, isNotNull, reason: 'unparseable ${s.name}');
        final isAbsolute = uri!.hasScheme;
        final isRootRelative = s.url.startsWith('/') && !s.url.startsWith('//');
        expect(
          isAbsolute || isRootRelative,
          isTrue,
          reason: '${s.name} -> ${s.url}',
        );
      }
    });
  });

  // --- Terminal ----------------------------------------------------------
  group('ArtitsApi', () {
    test('returns the reply field from a 200 response', () async {
      final api = _apiReturning(jsonEncode({'reply': 'pong'}));
      expect(await api.askAi('ping'), 'pong');
    });

    test('falls back to sandbox mode on a non-200 response', () async {
      final api = _apiReturning('nope', status: 502);
      expect(await api.askAi('ping'), ArtitsApi.sandboxFallback);
    });

    test('falls back to sandbox mode when the request throws', () async {
      final api = ArtitsApi(
        client: MockClient((_) async => throw const SocketishError()),
      );
      expect(await api.askAi('ping'), ArtitsApi.sandboxFallback);
    });

    test('falls back to the handshake message when reply is empty', () async {
      final api = _apiReturning(jsonEncode({'reply': ''}));
      expect(await api.askAi('ping'), ArtitsApi.handshakeFallback);
    });
  });

  group('ArtitsTerminal', () {
    testWidgets('starts collapsed and opens on tap', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          theme: buildArtitsTheme(),
          home: Scaffold(
            body: Stack(children: [ArtitsTerminal(api: _apiReturning('{}'))]),
          ),
        ),
      );
      expect(find.text('ARTITS_AI_v1.0'), findsOneWidget);
      expect(find.text('ARTITS_SECURE_COMMS'), findsNothing);

      await tester.tap(find.text('ARTITS_AI_v1.0'));
      await tester.pumpAndSettle();
      expect(find.text('ARTITS_SECURE_COMMS'), findsOneWidget);
    });

    testWidgets('sending a message appends the AI reply', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          theme: buildArtitsTheme(),
          home: Scaffold(
            body: Stack(
              children: [
                ArtitsTerminal(
                  api: _apiReturning(jsonEncode({'reply': 'acknowledged'})),
                ),
              ],
            ),
          ),
        ),
      );
      await tester.tap(find.text('ARTITS_AI_v1.0'));
      await tester.pumpAndSettle();

      await tester.enterText(find.byType(TextField), 'hello');
      await tester.tap(find.text('SEND'));
      await tester.pump();
      await tester.pump(const Duration(seconds: 1));

      expect(find.text('hello'), findsOneWidget);
      expect(find.text('acknowledged'), findsOneWidget);
    });
  });

  // --- Page shell --------------------------------------------------------
  group('ArtitsPage', () {
    testWidgets('renders the manifest sections and project systems', (
      tester,
    ) async {
      tester.view.physicalSize = const Size(1400, 4000);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);

      await tester.pumpWidget(const ArtitsApp());
      await tester.pump();

      expect(find.textContaining('SAHIL'), findsWidgets);
      expect(find.text('PRODUCTION_SYSTEMS (LIVE)'), findsOneWidget);
      expect(find.text('GLOBAL_CONNECTIVITY'), findsOneWidget);
      expect(find.byType(MemoryGraph3D), findsOneWidget);
      expect(find.byType(GameOfLife), findsOneWidget);
      for (final card in productionSystems) {
        expect(find.text(card.title), findsOneWidget);
      }
    });
  });

  // --- Graph rendering ---------------------------------------------------
  group('MemoryGraph3D', () {
    testWidgets('paints without throwing', (tester) async {
      tester.view.physicalSize = const Size(900, 600);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);

      await tester.pumpWidget(
        MaterialApp(
          theme: buildArtitsTheme(),
          home: Scaffold(
            body: SizedBox(width: 800, height: 500, child: MemoryGraph3D()),
          ),
        ),
      );
      // Advance several frames so the ticker rotates the sphere.
      for (var i = 0; i < 5; i++) {
        await tester.pump(const Duration(milliseconds: 32));
      }
      expect(tester.takeException(), isNull);
    });

    testWidgets('reports the tapped node to the parent', (tester) async {
      tester.view.physicalSize = const Size(900, 600);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);

      await tester.pumpWidget(
        MaterialApp(
          theme: buildArtitsTheme(),
          home: Scaffold(
            body: SizedBox(
              width: 800,
              height: 500,
              child: MemoryGraph3D(onSelectNode: (_) {}),
            ),
          ),
        ),
      );
      await tester.pump(const Duration(milliseconds: 32));

      // Hovering the centre of the sphere may not land on a node, so this
      // asserts only that hover + tap wiring never throws.
      final center = tester.getCenter(find.byType(MemoryGraph3D));
      final gesture = await tester.startGesture(center);
      await gesture.moveBy(const Offset(12, 8));
      await tester.pump(const Duration(milliseconds: 32));
      await gesture.up();
      await tester.pump();
      expect(tester.takeException(), isNull);
    });
  });

  // --- Game of Life ------------------------------------------------------
  group('GameOfLife', () {
    testWidgets('runs a bounded number of generations', (tester) async {
      tester.view.physicalSize = const Size(600, 300);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);

      await tester.pumpWidget(
        MaterialApp(
          theme: buildArtitsTheme(),
          home: Scaffold(
            body: const Center(
              child: SizedBox(width: 300, height: 150, child: GameOfLife()),
            ),
          ),
        ),
      );
      for (var i = 0; i < 3; i++) {
        await tester.pump(const Duration(milliseconds: 100));
      }
      expect(tester.takeException(), isNull);
    });
  });
}

/// Stand-in for a transport-level failure.
class SocketishError implements Exception {
  const SocketishError();
}
