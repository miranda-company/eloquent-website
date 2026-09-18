#!/usr/bin/env python3
"""Save a reproducible snapshot of Eloquent's public WordPress output."""

from __future__ import annotations

import hashlib
import json
import re
import time
from datetime import date
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from xml.etree import ElementTree


BASE = "https://eloquent.es"
ROOT = Path(__file__).resolve().parents[1] / "archive" / f"wordpress-{date.today()}"
USER_AGENT = "EloquentMigrationArchive/1.0 (public-site backup)"


def fetch(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(request, timeout=40) as response:
        return response.read()


def save(path: Path, body: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(body)


def slug_path(url: str) -> str:
    path = urlparse(url).path.strip("/")
    return path or "home"


def main() -> None:
    manifest: dict[str, object] = {"source": BASE, "captured_on": str(date.today()), "files": {}, "errors": []}
    saved: dict[str, dict[str, object]] = manifest["files"]  # type: ignore[assignment]
    errors: list[str] = manifest["errors"]  # type: ignore[assignment]

    def record(url: str, path: Path, body: bytes) -> None:
        save(path, body)
        saved[str(path.relative_to(ROOT))] = {
            "source": url,
            "bytes": len(body),
            "sha256": hashlib.sha256(body).hexdigest(),
        }

    sitemap_urls = [f"{BASE}/sitemap_index.xml"]
    routes: set[str] = set()
    media_urls: set[str] = set()
    while sitemap_urls:
        url = sitemap_urls.pop(0)
        try:
            body = fetch(url)
            record(url, ROOT / "sitemaps" / Path(urlparse(url).path).name, body)
            tree = ElementTree.fromstring(body)
            for loc in tree.findall(".//{*}loc"):
                if loc.text:
                    if loc.text.endswith(".xml"):
                        sitemap_urls.append(loc.text)
                    elif "/wp-content/uploads/" in loc.text:
                        media_urls.add(loc.text)
                    else:
                        routes.add(loc.text)
        except Exception as exc:
            errors.append(f"{url}: {exc}")

    endpoints = {
        "pages": "pages",
        "dossier-items": "dossier_item",
        "work": "eloquent_work",
        "media": "media",
        "issues": "dossier_issue",
        "dossier-formats": "dossier_format",
        "dossier-topics": "dossier_topic",
    }
    for name, endpoint in endpoints.items():
        url = f"{BASE}/wp-json/wp/v2/{endpoint}?per_page=100"
        try:
            body = fetch(url)
            record(url, ROOT / "rest" / f"{name}.json", body)
            data = json.loads(body)
            if name == "media":
                for item in data:
                    if item.get("source_url"):
                        media_urls.add(item["source_url"])
            else:
                for item in data:
                    if item.get("link"):
                        routes.add(item["link"])
        except Exception as exc:
            errors.append(f"{url}: {exc}")

    # These WordPress taxonomy/archive routes are public but absent from the XML sitemap.
    routes.update(
        {
            f"{BASE}/dossier/fundamentos-de-la-comunicacion/",
            f"{BASE}/dossier/comunicacion-de-crisis/",
            f"{BASE}/dossier/contenidos/",
            f"{BASE}/trabajo/",
        }
    )
    for url in sorted(routes):
        try:
            body = fetch(url)
            record(url, ROOT / "html" / slug_path(url) / "index.html", body)
            html = body.decode("utf-8", errors="replace")
            media_urls.update(re.findall(r"https?://eloquent\.es/wp-content/uploads/[^\s\"'<>),]+", html))
        except Exception as exc:
            errors.append(f"{url}: {exc}")

    # WordPress prints a template URL for Complianz CSS that is not a real asset.
    media_urls = {url for url in media_urls if "{" not in url and "}" not in url}
    for url in sorted(media_urls):
        parsed = urlparse(url)
        if parsed.netloc != "eloquent.es" or not parsed.path.startswith("/wp-content/uploads/"):
            continue
        path = ROOT / "media" / parsed.path.removeprefix("/wp-content/uploads/")
        if path.exists():
            body = path.read_bytes()
            saved[str(path.relative_to(ROOT))] = {
                "source": url,
                "bytes": len(body),
                "sha256": hashlib.sha256(body).hexdigest(),
            }
            continue
        try:
            body = fetch(url)
            record(url, path, body)
            time.sleep(0.05)
        except Exception as exc:
            errors.append(f"{url}: {exc}")

    route_list = sorted(routes)
    save(ROOT / "route-inventory.json", json.dumps(route_list, ensure_ascii=False, indent=2).encode())
    save(ROOT / "manifest.json", json.dumps(manifest, ensure_ascii=False, indent=2).encode())
    print(f"Archived {len(route_list)} routes, {len(media_urls)} media URLs, {len(saved)} files")
    if errors:
        print(f"Errors ({len(errors)}):")
        for error in errors:
            print(error)


if __name__ == "__main__":
    main()
