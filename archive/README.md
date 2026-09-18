# WordPress snapshot

`wordpress-2026-09-16/` preserves Eloquent's public WordPress output before the redesign:

- `rest/` contains unchanged API responses for five pages, four Dossier articles, three case studies, two issue terms, media metadata, and Dossier taxonomies.
- `html/` contains the public HTML for the 29 URLs in `route-inventory.json`, including taxonomy pages absent from the sitemap.
- `sitemaps/` contains the original Rank Math sitemap index and child sitemaps.
- `media/` contains 190 original or responsive public media files referenced by the API and captured pages.
- `text/` contains readable text extracted from the REST responses. The REST JSON and HTML are the authoritative, unchanged copies.
- `manifest.json` records source URLs, byte counts, and SHA-256 checksums for the captured files.

Run `python3 scripts/archive-wordpress.py` to refresh the raw snapshot and `python3 scripts/extract-archive-text.py` to recreate the readable text files. These scripts only read public URLs and write inside this archive.
