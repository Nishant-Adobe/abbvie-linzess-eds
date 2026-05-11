#!/usr/bin/env python3
"""
Saves conversation context to ai-tools/context/ when a Claude Code session ends.
Registered as a Stop hook in .claude/settings.local.json.

Output files:
  ai-tools/context/{YYYYMMDD_HHMMSS}_{session_id[:8]}.md  — timestamped snapshot
  ai-tools/context/latest.md                               — always the most recent session
  ai-tools/context/errors.log                              — hook errors (if any)
"""
import json
import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path


def read_transcript(path: str) -> list:
    messages = []
    try:
        with open(path, encoding="utf-8", errors="replace") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    messages.append(json.loads(line))
                except json.JSONDecodeError:
                    pass
    except OSError:
        pass
    return messages


def extract_text(content) -> str:
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for block in content:
            if isinstance(block, dict) and block.get("type") == "text":
                parts.append(block.get("text", ""))
        return "\n".join(p for p in parts if p)
    return ""


def get_conversation(messages: list) -> list:
    result = []
    for msg in messages:
        role = msg.get("role", "")
        if role not in ("user", "assistant"):
            continue
        text = extract_text(msg.get("content", "")).strip()
        if text:
            result.append({"role": role, "text": text})
    return result


def git_info(cwd: str) -> dict:
    info = {}
    for cmd, key in [
        (["git", "branch", "--show-current"], "branch"),
        (["git", "status", "--short"], "status"),
    ]:
        try:
            r = subprocess.run(cmd, capture_output=True, text=True, cwd=cwd, timeout=10)
            if r.returncode == 0:
                info[key] = r.stdout.strip()
        except Exception:
            pass
    return info


def build_markdown(session_id, timestamp, cwd, conversation, git) -> str:
    short_id = session_id[:8] if len(session_id) >= 8 else session_id
    lines = [
        "# Claude Code Session Context",
        "",
        f"**Session:** `{short_id}`  ",
        f"**Date:** {timestamp}  ",
        f"**Branch:** {git.get('branch', 'unknown')}  ",
        f"**Project:** {cwd}",
        "",
    ]

    first_user = next((m["text"] for m in conversation if m["role"] == "user"), "")
    if first_user:
        lines += ["## Initial Task", "", first_user[:600], ""]

    git_status = git.get("status", "").strip()
    if git_status:
        lines += ["## Changed Files", "", "```", git_status, "```", ""]

    last_assistant = next(
        (m["text"] for m in reversed(conversation) if m["role"] == "assistant"), ""
    )
    if last_assistant:
        lines += ["## Last Assistant Response", "", last_assistant[:1200], ""]

    if conversation:
        lines += ["## Conversation (last 10 messages)", ""]
        for msg in conversation[-10:]:
            role = msg["role"].capitalize()
            text = msg["text"][:400]
            lines += [f"**{role}:** {text}", ""]

    lines += [
        "---",
        "",
        "_To reload this context, share this file with Claude Code at the start of your session._",
    ]
    return "\n".join(lines)


def main():
    try:
        raw = sys.stdin.read()
        payload = json.loads(raw) if raw.strip() else {}
    except Exception:
        payload = {}

    try:
        session_id = payload.get("session_id", "unknown")
        transcript_path = payload.get("transcript_path", "")
        cwd = payload.get("cwd", os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd()))
        project_dir = os.environ.get("CLAUDE_PROJECT_DIR", cwd)

        context_dir = Path(project_dir) / "ai-tools" / "context"
        context_dir.mkdir(parents=True, exist_ok=True)

        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        file_ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        short_id = session_id[:8] if len(session_id) >= 8 else session_id

        messages = read_transcript(transcript_path) if transcript_path else []
        conversation = get_conversation(messages)
        git = git_info(cwd)

        md_content = build_markdown(session_id, timestamp, cwd, conversation, git)

        (context_dir / f"{file_ts}_{short_id}.md").write_text(md_content, encoding="utf-8")
        (context_dir / "latest.md").write_text(md_content, encoding="utf-8")

    except Exception as e:
        try:
            log = Path(os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd())) / "ai-tools" / "context" / "errors.log"
            log.parent.mkdir(parents=True, exist_ok=True)
            with open(log, "a", encoding="utf-8") as f:
                f.write(f"{datetime.now().isoformat()} ERROR: {e}\n")
        except Exception:
            pass

    sys.exit(0)


if __name__ == "__main__":
    main()
