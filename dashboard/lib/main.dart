import 'package:flutter/material.dart';

import 'src/features/manifest/artits_page.dart';
import 'src/theme.dart';

import 'design_skin.dart';
import 'package:infortts_shared/infortts_shared.dart';
void main() {
  // Design skin for this app (generated; see tools/design-pipeline).
  AppDesignSkin.boot();
  runApp(const ArtitsApp());
}

class ArtitsApp extends StatelessWidget {
  const ArtitsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sahil Rathee | Architect of Infortts by Infortts',
      debugShowCheckedModeBanner: false,
      theme: AcousticTheme.applySkinTo(buildArtitsTheme(), AppDesignSkin.skin),
      home: const ArtitsPage(),
    );
  }
}
