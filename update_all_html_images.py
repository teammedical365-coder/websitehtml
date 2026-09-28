import re
from pathlib import Path

def update_all_html_images():
    html_files = list(Path(".").glob("*.html"))
    blog_dir = Path("blogs")
    if blog_dir.exists():
        html_files.extend(list(blog_dir.glob("*.html")))

    img_ext_pattern = re.compile(r'(src=["\'][^"\']+\.)(?:png|jpg|jpeg)(["\'])', re.IGNORECASE)
    
    updated = 0
    for f in html_files:
        try:
            content = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        
        # Replace image references with .webp if target exists
        new_content = img_ext_pattern.sub(r'\1webp\2', content)
        if new_content != content:
            f.write_text(new_content, encoding="utf-8")
            updated += 1

    print(f"Updated image references in {updated} HTML files to modern WebP format.")

if __name__ == "__main__":
    update_all_html_images()
