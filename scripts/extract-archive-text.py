#!/usr/bin/env python3
"""Create readable text files from the unchanged WordPress REST archive."""

from __future__ import annotations

import html
import json
import re
from datetime import date
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1] / "archive" / f"wordpress-{date.today()}"


class TextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []
        self.hidden_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in {"script", "style", "svg"}:
            self.hidden_depth += 1
        if tag in {"p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "br", "blockquote"}:
            self.parts.append("\n")
        if tag == "li":
            self.parts.append("• ")

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style", "svg"}:
            self.hidden_depth = max(0, self.hidden_depth - 1)
        if tag in {"p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "blockquote"}:
            self.parts.append("\n")

    def handle_data(self, data: str) -> None:
        if not self.hidden_depth:
            self.parts.append(data)

    def text(self) -> str:
        lines = [re.sub(r"\s+", " ", line).strip() for line in "".join(self.parts).splitlines()]
        return "\n".join(line for line in lines if line)


def plain_text(source: str) -> str:
    parser = TextExtractor()
    parser.feed(source)
    return html.unescape(parser.text())


def main() -> None:
    count = 0
    for category in ("pages", "dossier-items", "work", "issues"):
        records = json.loads((ROOT / "rest" / f"{category}.json").read_text())
        destination = ROOT / "text" / category
        destination.mkdir(parents=True, exist_ok=True)
        for record in records:
            title = record.get("title", {}).get("rendered", "") if category != "issues" else record["name"]
            content = record.get("content", {}).get("rendered", "") if category != "issues" else record.get("description", "")
            header = [plain_text(title), record.get("link", ""), f"WordPress ID: {record['id']}"]
            if record.get("date"):
                header.append(f"Original date: {record['date']}")
            body = "\n".join(header) + "\n\n" + plain_text(content) + "\n"
            (destination / f"{record['slug']}.txt").write_text(body)
            count += 1
    print(f"Extracted {count} readable text files")


if __name__ == "__main__":
    main()
