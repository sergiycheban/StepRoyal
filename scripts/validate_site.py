from pathlib import Path
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://step-royal.com"
errors = []
indexable = []
canonicals = {}


def local_target_exists(source: Path, value: str) -> bool:
    value = value.split("#", 1)[0].split("?", 1)[0]
    if not value:
        return True
    target = ROOT / value.lstrip("/") if value.startswith("/") else source.parent / value
    if value.endswith("/") or target.is_dir():
        target = target / "index.html"
    return target.exists()


for path in ROOT.rglob("*.html"):
    soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
    robots = soup.find("meta", attrs={"name": "robots"})
    noindex = bool(robots and "noindex" in robots.get("content", "").lower())

    if not noindex:
        indexable.append(path)
        if len(soup.find_all("h1")) != 1:
            errors.append(f"{path}: expected exactly one H1")
        canonical_tag = soup.find("link", rel="canonical")
        if not canonical_tag:
            errors.append(f"{path}: missing canonical")
        else:
            canonical = canonical_tag.get("href", "")
            if canonical in canonicals:
                errors.append(f"{path}: duplicate canonical also used by {canonicals[canonical]}")
            canonicals[canonical] = path
            parsed = urlparse(canonical)
            local = ROOT / parsed.path.lstrip("/")
            if parsed.path.endswith("/"):
                local = local / "index.html"
            if not local.exists():
                errors.append(f"{path}: canonical target does not exist {canonical}")
        if not soup.find("meta", attrs={"name": "description"}):
            errors.append(f"{path}: missing meta description")
        for script in soup.find_all("script", attrs={"type": "application/ld+json"}):
            try:
                json.loads(script.string or script.get_text())
            except Exception as exc:
                errors.append(f"{path}: invalid JSON-LD: {exc}")
        alternates = {tag.get("hreflang"): tag.get("href") for tag in soup.find_all("link", rel="alternate") if tag.get("hreflang")}
        for required in ("ru", "uk", "en", "x-default"):
            if required not in alternates:
                errors.append(f"{path}: missing hreflang {required}")
        for hreflang, href in alternates.items():
            if not href or not href.startswith(BASE_URL):
                continue
            parsed = urlparse(href)
            local = ROOT / parsed.path.lstrip("/")
            if parsed.path.endswith("/"):
                local = local / "index.html"
            if not local.exists():
                errors.append(f"{path}: hreflang {hreflang} target missing {href}")

    for tag, attr in (("a", "href"), ("img", "src"), ("script", "src"), ("link", "href")):
        for element in soup.find_all(tag):
            value = element.get(attr)
            if not value or value.startswith(("http://", "https://", "mailto:", "tel:", "viber:", "#", "data:", "javascript:")):
                continue
            if not local_target_exists(path, value):
                errors.append(f"{path}: missing local target {value}")

ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
root = ET.parse(ROOT / "sitemap.xml").getroot()
sitemap_urls = {node.text.strip() for node in root.findall("sm:url/sm:loc", ns)}
canonical_urls = set(canonicals)
if sitemap_urls != canonical_urls:
    for missing in sorted(canonical_urls - sitemap_urls):
        errors.append(f"sitemap: missing canonical {missing}")
    for extra in sorted(sitemap_urls - canonical_urls):
        errors.append(f"sitemap: non-canonical URL listed {extra}")

expected = 93
if len(indexable) != expected:
    errors.append(f"indexable page count is {len(indexable)}, expected {expected}")

if errors:
    print("Validation failed:")
    for error in errors:
        print(f"- {error}")
    raise SystemExit(1)

print(f"Validation passed: {len(indexable)} indexable pages, consistent canonical/hreflang/sitemap, valid JSON-LD, no broken local targets.")
