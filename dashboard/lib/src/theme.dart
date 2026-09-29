import 'package:flutter/material.dart';

/// Port of the CSS custom properties in `src/index.css`.
///
/// The React build read these from `:root`; they are inlined here so the
/// Flutter port keeps the identical palette. The project deliberately uses a
/// near-black background (not white) despite the default light scaffold.
class ArtitsColors {
  const ArtitsColors._();

  static const bg = Color(0xFF020617);
  static const panel = Color(0xFF090D16);
  static const panelAlt = Color(0xFF0F172A);
  static const panelHeader = Color(0xFF121B2D);
  static const fg = Color(0xFFE2E8F0);
  static const active = Color(0xFF00F3FF);
  static const sonarBlue = Color(0xFF0066FF);
  static const sky = Color(0xFF38BDF8);
  static const steel = Color(0xFF64748B);
  static const steelDim = Color(0xFF475569);
  static const slate = Color(0xFF334155);
  static const titanium = Color(0xFF94A3B8);
  static const themeColor = Color(0xFF0EA5E9);
}

ThemeData buildArtitsTheme() {
  return ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    scaffoldBackgroundColor: ArtitsColors.bg,
    colorScheme: const ColorScheme.dark(
      surface: ArtitsColors.panel,
      primary: ArtitsColors.sky,
      secondary: ArtitsColors.sonarBlue,
    ),
    textTheme: const TextTheme(
      bodyMedium: TextStyle(color: ArtitsColors.titanium),
      bodySmall: TextStyle(color: ArtitsColors.steelDim),
      labelSmall: TextStyle(color: ArtitsColors.steelDim),
    ),
  );
}

/// Monospace style used for the terminal, graph labels and micro-labels.
const TextStyle artitsMono = TextStyle(
  fontFamily: 'JetBrains Mono',
  fontFamilyFallback: ['monospace'],
);
