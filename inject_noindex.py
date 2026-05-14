import os
import json
import re

public_html = r'c:\Users\USER\Downloads\public_html'
seo_pages_json = os.path.join(public_html, 'seo_pages.json')

with open(seo_pages_json, 'r') as f:
    seo_data = json.load(f)

# The slugs are like "/solutions/hospital-management-software-jaipur"
# and the files are like "hospital-management-software-jaipur.html"
files_to_update = []
for entry in seo_data:
    slug = entry['url_slug']
    filename = slug.replace('/solutions/', '').strip('/') + '.html'
    filepath = os.path.join(public_html, filename)
    if os.path.exists(filepath):
        files_to_update.append(filepath)

print(f"Found {len(files_to_update)} files to update.")

count = 0
for filepath in files_to_update:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<meta name="robots" content="noindex, nofollow">' not in content:
        # Inject after description or after title
        new_content = re.sub(r'(<meta name="description" content="[^"]*">)', r'\1\n    <meta name="robots" content="noindex, nofollow">', content)
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1

print(f"Updated {count} files.")
