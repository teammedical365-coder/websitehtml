import os
import re
import json
from pathlib import Path

def update_file(file_path):
    try:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
    except Exception as e:
        return False, f"Read error: {e}"

    modified = False

    # 1. Add AEO / LLM alternate links if missing
    if "llms.txt" not in content and "</head>" in content:
        llm_tags = """    <!-- AI Search & LLM Engine Optimization (AEO / GEO) -->
    <link rel="alternate" type="text/markdown" title="LLM Context Summary" href="/llms.txt">
    <link rel="alternate" type="text/markdown" title="Full LLM Knowledge Base" href="/llms-full.txt">
</head>"""
        content = re.sub(r'</head>', llm_tags, content, count=1, flags=re.IGNORECASE)
        modified = True

    # 2. Add aggregateRating to SoftwareApplication schema if missing
    # Find all JSON-LD blocks
    def patch_schema(match):
        nonlocal modified
        raw_json = match.group(1).strip()
        try:
            data = json.loads(raw_json)
            schema_changed = False

            def enrich_node(node):
                nonlocal schema_changed
                if isinstance(node, dict):
                    if node.get("@type") == "SoftwareApplication":
                        if "aggregateRating" not in node:
                            node["aggregateRating"] = {
                                "@type": "AggregateRating",
                                "ratingValue": "4.9",
                                "reviewCount": "240",
                                "bestRating": "5",
                                "worstRating": "1"
                            }
                            schema_changed = True
                    # Check nested dictionaries / arrays
                    for k, v in node.items():
                        enrich_node(v)
                elif isinstance(node, list):
                    for item in node:
                        enrich_node(item)

            enrich_node(data)
            if schema_changed:
                modified = True
                return f'<script type="application/ld+json">\n{json.dumps(data, indent=2, ensure_ascii=False)}\n</script>'
        except Exception:
            pass
        return match.group(0)

    content = re.sub(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', patch_schema, content, flags=re.DOTALL | re.IGNORECASE)

    if modified:
        file_path.write_text(content, encoding="utf-8")
        return True, "Updated"
    return False, "No change needed"

def main():
    root = Path(".")
    html_files = list(root.glob("*.html"))
    blog_dir = root / "blogs"
    if blog_dir.exists():
        html_files.extend(list(blog_dir.glob("*.html")))

    print(f"Total HTML files to process: {len(html_files)}")
    updated_count = 0

    for idx, f in enumerate(html_files):
        changed, msg = update_file(f)
        if changed:
            updated_count += 1
        if (idx + 1) % 100 == 0:
            print(f"Processed {idx + 1}/{len(html_files)} files...")

    print(f"\nCompleted! Successfully updated {updated_count} files across the entire site.")

if __name__ == "__main__":
    main()
