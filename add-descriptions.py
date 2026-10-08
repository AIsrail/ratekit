#!/usr/bin/env python3
import os
import re
from pathlib import Path

roles_dir = Path("resumelink-local/_roles")
count = 0

for md_file in sorted(roles_dir.glob("*.md")):
    content = md_file.read_text(encoding="utf-8")

    # Skip if description already exists
    if re.search(r"^description:", content, re.MULTILINE):
        continue

    # Extract summary_hack
    summary_match = re.search(r'summary_hack:\s*"([^"]+)"', content)
    if not summary_match:
        summary_match = re.search(r"summary_hack:\s*'([^']+)'", content)

    if summary_match:
        summary = summary_match.group(1).strip()
        # Limit to ~160 chars for meta description
        description = (summary[:157] + "...") if len(summary) > 160 else summary

        # Add description before closing --- of front matter
        new_content = re.sub(
            r"^(---.*?)(\n---\n)",
            rf"\1\ndescription: \"{description}\"\2",
            content,
            count=1,
            flags=re.DOTALL
        )

        md_file.write_text(new_content, encoding="utf-8")
        count += 1
        print(f"+ {md_file.name}")

print(f"\n✅ Added description to {count} files")
