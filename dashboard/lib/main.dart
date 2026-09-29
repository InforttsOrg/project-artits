import 'package:flutter/material.dart';

import 'src/features/manifest/artits_page.dart';
import 'src/theme.dart';

void main() {
  runApp(const ArtitsApp());
}

class ArtitsApp extends StatelessWidget {
  const ArtitsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sahil Rathee | Architect of Infortts by Infortts',
      debugShowCheckedModeBanner: false,
      theme: buildArtitsTheme(),
      home: const ArtitsPage(),
    );
  }
}
