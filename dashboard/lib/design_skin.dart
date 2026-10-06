// GENERATED FILE — DO NOT EDIT BY HAND.
// Regenerate: python3 tools/design-pipeline/generate.py
// Source skill: ~/.config/opencode/skills/artistic/DESIGN.md
//
//   Design : Artistic
//   Mode   : dark
//   Skill  : artistic
//
// Audit at generation time (WCAG on the generated panel surface):
//   body contrast  15.38:1   subtext contrast 6.36:1   accent 12.17:1
//
// The Infortts 3D emblem, logo and shell chrome are NOT affected by this file —
// they stay canonical Rocky Vision. Only the product surface is restyled, which
// is how each app ends up visually distinct while remaining on-brand.
//
// Prefer composing `shared` primitives (AcousticSurface, AcousticButton,
// AcousticText, AcousticSection…) over hand-rolled decoration; they read these
// values automatically.

import 'package:flutter/material.dart';

import 'package:infortts_shared/infortts_shared.dart';

/// Design skin for **artits/dashboard**.
class AppDesignSkin {
  const AppDesignSkin._();

  static const String appName = 'artits/dashboard';
  static const String skill = 'artistic';
  static const String designName = 'Artistic';
  static const bool isDark = true;

  /// Apply before `runApp`.
  static void boot({Brightness brightness = Brightness.dark}) {
    InforttsDesign.boot(skin, initialBrightness: brightness);
  }

  static const AcousticDynamicThemeConfig skin = AcousticDynamicThemeConfig(
    // accents
    primaryColor: Color(0xFF35EC82),
    secondaryColor: Color(0xFF5490EE),
    primaryDimColor: Color(0xFF145431),
    successColor: Color(0xFF16A34A),
    dangerColor: Color(0xFFDC2626),
    warnColor: Color(0xFFD97706),

    // surfaces
    darkBg: Color(0xFF050B0D),
    darkPanelBg: Color(0xFF06130E),
    lightBg: Color(0xFFFFFFFF),
    lightPanelBg: Color(0xFFFFFFFF),
    obsidianColor: Color(0xFF091D16),
    activeCardColor: Color(0xFF3F4A49),

    // text (dark palette)
    titaniumColor: Color(0xFFE2E8F0),
    steelColor: Color(0xFF8E979A),
    midGrayColor: Color(0xFF3F4A49),
    // Drives AcousticColors.lightOnBackground/lightOnSurface, so it must be
    // the LIGHT palette's ink — the dark titanium would be invisible on a light
    // panel. Light-mode subtext reuses steelColor via lightOnSurfaceVariant.
    textOnSurface: Color(0xFF111827),
    lightSubTextColor: Color(0xFF7C8088),
    outlineColor: Color(0xFF3F4A49),

    // type
    fontFamily: 'Limelight',
    monoFamily: 'JetBrains Mono',
    displayFamily: 'Limelight',
    bodyTextSize: 16,
    headingTextSize: 36,

    // geometry
    cardBorderRadius: 8,
    radiusSm: 4,
  );
}

