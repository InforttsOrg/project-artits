import 'package:flutter/material.dart';

import '../../api/artits_api.dart';
import '../../theme.dart';

class TerminalMessage {
  const TerminalMessage({
    required this.fromUser,
    required this.text,
    required this.time,
  });

  final bool fromUser;
  final String text;
  final String time;
}

/// Port of the floating `ARTITS_AI_v1.0` terminal from `App.tsx`.
class ArtitsTerminal extends StatefulWidget {
  const ArtitsTerminal({super.key, this.api});

  final ArtitsApi? api;

  @override
  State<ArtitsTerminal> createState() => _ArtitsTerminalState();
}

class _ArtitsTerminalState extends State<ArtitsTerminal> {
  static String _clock() {
    final now = TimeOfDay.now();
    final h = now.hourOfPeriod == 0 ? 12 : now.hourOfPeriod;
    final m = now.minute.toString().padLeft(2, '0');
    return '$h:$m';
  }

  late final ArtitsApi _api = widget.api ?? ArtitsApi();
  final List<TerminalMessage> _messages = [
    TerminalMessage(
      fromUser: false,
      text:
          'ARTITS AI Terminal Initialized. Ready for authorization handshake.',
      time: _clock(),
    ),
  ];
  final TextEditingController _input = TextEditingController();
  final ScrollController _scroll = ScrollController();
  bool _open = false;
  bool _typing = false;

  @override
  void dispose() {
    _api.dispose();
    _input.dispose();
    _scroll.dispose();
    super.dispose();
  }

  void _autoscroll() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scroll.hasClients) {
        _scroll.animateTo(
          _scroll.position.maxScrollExtent,
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOut,
        );
      }
    });
  }

  Future<void> _send() async {
    final text = _input.text.trim();
    if (text.isEmpty) return;
    _input.clear();
    setState(() {
      _messages.add(
        TerminalMessage(fromUser: true, text: text, time: _clock()),
      );
      _typing = true;
    });
    _autoscroll();

    final reply = await _api.askAi(text);
    // The React version delayed by 600 ms to simulate compilation.
    await Future<void>.delayed(const Duration(milliseconds: 600));
    if (!mounted) return;
    setState(() {
      _messages.add(
        TerminalMessage(fromUser: false, text: reply, time: _clock()),
      );
      _typing = false;
    });
    _autoscroll();
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      right: 32,
      bottom: 32,
      child: _open ? _panel() : _button(),
    );
  }

  Widget _button() {
    return Semantics(
      button: true,
      label: 'Open ARTITS_AI terminal',
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: () => setState(() => _open = true),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            decoration: BoxDecoration(
              color: ArtitsColors.fg,
              border: Border.all(color: ArtitsColors.fg),
              boxShadow: const [
                BoxShadow(
                  color: Color(0x26000000),
                  blurRadius: 20,
                  offset: Offset(0, 4),
                ),
              ],
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 6,
                  height: 6,
                  decoration: const BoxDecoration(
                    color: ArtitsColors.active,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  'ARTITS_AI_v1.0',
                  style: artitsMono.copyWith(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: ArtitsColors.bg,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _panel() {
    return Container(
      width: 380,
      height: 450,
      decoration: BoxDecoration(
        color: ArtitsColors.panel,
        border: Border.all(color: ArtitsColors.sky.withValues(alpha: 0.15)),
        borderRadius: const BorderRadius.all(Radius.circular(2)),
        boxShadow: const [
          BoxShadow(
            color: Color(0x80000000),
            blurRadius: 40,
            offset: Offset(0, 12),
          ),
        ],
      ),
      child: Column(
        children: [
          _header(),
          Expanded(child: _messagesView()),
          _inputRow(),
        ],
      ),
    );
  }

  Widget _header() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: ArtitsColors.panelHeader,
        border: Border(
          bottom: BorderSide(color: ArtitsColors.sky.withValues(alpha: 0.1)),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(
                width: 6,
                height: 6,
                decoration: const BoxDecoration(
                  color: ArtitsColors.active,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 8),
              Text(
                'ARTITS_SECURE_COMMS',
                style: artitsMono.copyWith(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1,
                  color: ArtitsColors.fg,
                ),
              ),
            ],
          ),
          Semantics(
            button: true,
            label: 'Close terminal',
            child: GestureDetector(
              onTap: () => setState(() => _open = false),
              child: Padding(
                padding: EdgeInsets.all(4),
                child: Text('[X]', style: artitsMono.copyWith(fontSize: 12)),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _messagesView() {
    return ListView.builder(
      controller: _scroll,
      padding: const EdgeInsets.all(16),
      itemCount: _messages.length + (_typing ? 1 : 0),
      itemBuilder: (context, i) {
        if (i == _messages.length) {
          return Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Text(
              'System compiling response...',
              style: artitsMono.copyWith(fontSize: 10, color: ArtitsColors.sky),
            ),
          );
        }
        final m = _messages[i];
        return Align(
          alignment: m.fromUser ? Alignment.centerRight : Alignment.centerLeft,
          child: Container(
            constraints: const BoxConstraints(maxWidth: 320),
            margin: const EdgeInsets.only(bottom: 10),
            child: Column(
              crossAxisAlignment: m.fromUser
                  ? CrossAxisAlignment.end
                  : CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                  decoration: BoxDecoration(
                    color: m.fromUser
                        ? ArtitsColors.slate
                        : ArtitsColors.panelAlt,
                    border: Border.all(
                      color: m.fromUser
                          ? ArtitsColors.slate
                          : ArtitsColors.sky.withValues(alpha: 0.1),
                    ),
                    borderRadius: const BorderRadius.all(Radius.circular(2)),
                  ),
                  child: Text(
                    m.text,
                    style: artitsMono.copyWith(
                      fontSize: 11,
                      height: 1.4,
                      color: m.fromUser ? ArtitsColors.fg : ArtitsColors.sky,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 4),
                  child: Text(
                    m.time,
                    style: artitsMono.copyWith(
                      fontSize: 8,
                      color: ArtitsColors.steelDim,
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

  Widget _inputRow() {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: ArtitsColors.panel,
        border: Border(
          top: BorderSide(color: ArtitsColors.sky.withValues(alpha: 0.1)),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _input,
              onSubmitted: (_) => _send(),
              style: artitsMono.copyWith(fontSize: 11, color: ArtitsColors.fg),
              cursorColor: ArtitsColors.sky,
              decoration: InputDecoration(
                isDense: true,
                hintText: 'Type a secure message...',
                hintStyle: artitsMono.copyWith(
                  fontSize: 11,
                  color: ArtitsColors.steelDim,
                ),
                filled: true,
                fillColor: ArtitsColors.panelAlt,
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 8,
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(2),
                  borderSide: BorderSide(
                    color: ArtitsColors.sky.withValues(alpha: 0.15),
                  ),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(2),
                  borderSide: BorderSide(
                    color: ArtitsColors.sky.withValues(alpha: 0.15),
                  ),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(2),
                  borderSide: BorderSide(
                    color: ArtitsColors.sky.withValues(alpha: 0.4),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 8),
          TextButton(
            onPressed: _send,
            style: TextButton.styleFrom(
              backgroundColor: ArtitsColors.sky,
              foregroundColor: ArtitsColors.panel,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              shape: const RoundedRectangleBorder(),
            ),
            child: Text(
              'SEND',
              style: artitsMono.copyWith(
                fontSize: 10,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
