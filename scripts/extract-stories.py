"""One-off migration helper: pulls curated posts from the old WordPress REST dump
(/tmp/crawl/posts.json), sanitizes the HTML, downloads inline images and writes
src/data/stories.json. Re-run only if you want to refresh content from the old site."""
import html
import json
import os
import re
import subprocess
from urllib.parse import unquote

from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_DIR = "/tmp/story-raw"
OUT_JSON = os.path.join(ROOT, "src", "data", "stories.json")
UPLOADS = "https://sisibaikproject.id/wp-content/uploads/"

CURATED = [
    ("lulus-ibm-2025-2026", "Indonesia Bisa Membaca"),
    ("indonesia-bisa-membaca-menghadirkan-guest-tutor-week", "Indonesia Bisa Membaca"),
    ("semangat-baru-di-awal-tahun-belajar-membaca-sambil-belajar-bertani-bersama-tanampangan-id", "Kolaborasi"),
    ("sisi-baik-gelar-workshop-perfilman", "Kelas Keterampilan"),
    ("kejar-mimpi-jadi-reporter-nazwa-raih-bantuan-patungan-spp", "Patungan SPP"),
    ("harapan-rado-di-tengah-keterbatasan", "Patungan SPP"),
    ("berkat-patungan-spp-alma-bisa-ikut-ujian", "Patungan SPP"),
    ("rssg-a-la-bu-tien-dimulai-lagi", "Indonesia Bisa Membaca"),
    ("lurah-ratu-jaya-apresiasi-sisi-baik-project", "Komunitas"),
    ("indonesia-bisa-membaca-terima-21-siswa-baru", "Indonesia Bisa Membaca"),
    ("indonesia-bisa-membaca-lepas-11-siswa", "Indonesia Bisa Membaca"),
    ("manda-menolak-menyerah-dari-tekanan-ekonomi", "Patungan SPP"),
    ("anggie-tanggalkan-rasa-malu-demi-cita-cita", "Patungan SPP"),
    ("sisi-baik-dan-liputan6-salurkan-bantuan-zurich-untuk-difabel", "Kolaborasi"),
    ("fik-ui-periksa-kesehatan-orang-tua-siswa-indonesia-bisa-membaca", "Kolaborasi"),
    ("patungan-spp-bantu-siswa-bantu-sekolah", "Patungan SPP"),
    ("indonesia-bisa-membaca-dimulai", "Indonesia Bisa Membaca"),
    ("jbl-resmi-jadi-mitra-kebaikan-sisi-baik-project", "Mitra Kebaikan"),
]

ALLOWED = {"p", "h2", "h3", "h4", "ul", "ol", "li", "blockquote", "strong", "em", "b", "i", "a", "figure", "img", "figcaption", "br"}

# Internal links on the old site that have a home on the new one.
LINK_MAP = {
    "patungan-spp": "/program-utama/#patungan-spp",
    "patungan-opor": "/program-utama/#patungan-opor",
    "indonesia-bisa-membaca": "/program-utama/#indonesia-bisa-membaca",
    "program-utama": "/program-utama/",
    "do-donate": "/do-donate/",
    "tentang-kami": "/tentang-kami/",
    "stories": "/stories/",
}


def full_size(url: str) -> str:
    url = url.split("?")[0]
    return re.sub(r"-\d+x\d+(\.\w+)$", r"\1", url)


def download(url: str, slug: str) -> str:
    os.makedirs(os.path.join(RAW_DIR, slug), exist_ok=True)
    name = unquote(url.rsplit("/", 1)[-1])
    name = re.sub(r"[^A-Za-z0-9._-]", "-", name)
    dest = os.path.join(RAW_DIR, slug, name)
    if not os.path.exists(dest):
        subprocess.run(["curl", "-sfL", "-A", "Mozilla/5.0", url, "-o", dest], check=False)
    return name


def rewrite_link(href: str) -> str:
    if not href.startswith("https://sisibaikproject.id"):
        return href
    path = href.replace("https://sisibaikproject.id", "").strip("/")
    last = path.split("/")[-1] if path else ""
    for key, target in LINK_MAP.items():
        if last == key or path.endswith(key):
            return target
    for slug, _ in CURATED:
        if slug in path:
            return f"/stories/{slug}/"
    return "/stories/"


def clean(content: str, slug: str):
    soup = BeautifulSoup(content, "html.parser")
    images = []
    for bad in soup.find_all(["script", "style", "iframe", "noscript", "button", "svg"]):
        bad.decompose()
    for img in soup.find_all("img"):
        src = img.get("data-src") or img.get("src") or ""
        if "uploads" not in src or src.endswith(".gif"):
            img.decompose()
            continue
        big = full_size(src)
        name = download(big, slug)
        images.append(name)
        alt = img.get("alt", "")
        for attr in list(img.attrs):
            del img[attr]
        img["src"] = f"@story/{slug}/{name}"
        img["alt"] = alt
    for tag in soup.find_all(True):
        if tag.name not in ALLOWED:
            tag.unwrap()
            continue
        keep = {}
        if tag.name == "a" and tag.get("href"):
            keep["href"] = rewrite_link(tag["href"])
            if keep["href"].startswith("http"):
                keep["target"] = "_blank"
                keep["rel"] = "noopener"
        if tag.name == "img":
            keep = {"src": tag["src"], "alt": tag.get("alt", "")}
        tag.attrs = keep
    # Links wrapping images on WP point to the raw upload: drop the anchor.
    for a in soup.find_all("a"):
        if a.find("img"):
            a.unwrap()
    for h in soup.find_all("h4"):
        h.name = "h3"
    # Remove empty paragraphs.
    for p in soup.find_all("p"):
        if not p.get_text(strip=True) and not p.find("img"):
            p.decompose()
    # Bare images inside <p> become figures.
    for p in soup.find_all("p"):
        imgs = p.find_all("img")
        if imgs and not p.get_text(strip=True):
            fig = soup.new_tag("figure")
            for im in imgs:
                fig.append(im.extract())
            p.replace_with(fig)
    out = str(soup)
    out = re.sub(r"\n\s*\n+", "\n", out).strip()
    out = out.replace("\u2014", ", ").replace("&mdash;", ", ")
    return out, images


def main():
    posts = {p["slug"]: p for p in json.load(open("/tmp/crawl/posts.json"))}
    stories = []
    for slug, category in CURATED:
        p = posts[slug]
        body, images = clean(p["content"]["rendered"], slug)
        cover = ""
        try:
            cover_url = p["_embedded"]["wp:featuredmedia"][0]["source_url"]
            cover = download(cover_url, slug)
        except (KeyError, IndexError):
            cover = images[0] if images else ""
        excerpt = BeautifulSoup(p["excerpt"]["rendered"], "html.parser").get_text(" ", strip=True)
        excerpt = re.sub(r"\s*\[?(&hellip;|…)\]?\s*$", "", excerpt).replace("[…]", "").strip()
        excerpt = excerpt.replace("\u2014", ",")
        title = html.unescape(p["title"]["rendered"]).replace("\u2014", ",")
        stories.append({
            "slug": slug,
            "title": title,
            "date": p["date"],
            "category": category,
            "excerpt": excerpt,
            "cover": cover,
            "legacyPath": p["link"].replace("https://sisibaikproject.id", ""),
            "body": body,
        })
        print(slug, len(body), len(images), cover)
    os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)
    json.dump(stories, open(OUT_JSON, "w"), ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
