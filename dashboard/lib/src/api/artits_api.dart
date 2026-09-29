import 'dart:convert';

import 'package:http/http.dart' as http;

/// Talks to the Cloudflare Pages Functions in `projects/artits/functions/api`.
///
/// `POST /api/ai` answers `{ "reply": "..." }`; a transport failure falls back
/// to the local sandbox copy, matching the `catch` branch of the React app.
class ArtitsApi {
  ArtitsApi({http.Client? client, this.baseUrl = '/'})
    : _client = client ?? http.Client();

  final http.Client _client;
  final String baseUrl;

  static const String sandboxFallback =
      'Secure API connection offline. Local sandbox terminal mode enabled. '
      'Awaiting your instruction.';

  static const String handshakeFallback =
      'Handshake successful. Secure terminal mode active. Awaiting your '
      'instruction.';

  Future<String> askAi(String message) async {
    final uri = Uri.parse('$baseUrl/api/ai');
    try {
      final res = await _client
          .post(
            uri,
            headers: const {'Content-Type': 'application/json'},
            body: jsonEncode({'message': message}),
          )
          .timeout(const Duration(seconds: 10));
      if (res.statusCode != 200) return sandboxFallback;
      final decoded = jsonDecode(res.body);
      final reply = decoded is Map ? decoded['reply'] : null;
      if (reply is String && reply.isNotEmpty) return reply;
      return handshakeFallback;
    } catch (_) {
      return sandboxFallback;
    }
  }

  void dispose() => _client.close();
}
