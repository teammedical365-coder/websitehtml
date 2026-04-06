
import os
import re

root = r'C:\Users\USER\Downloads\public_html'
html_files = [f for f in os.listdir(root) if f.endswith('.html')]

stats = {
    'total': 0,
    'has_global_styles': 0,
    'has_global_scripts': 0,
    'has_viewport': 0,
    'has_footer_target': 0
}

footer_tag_missing = []

for f in html_files:
    stats['total'] += 1
    path = os.path.join(root, f)
    try:
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
            if 'global-styles.css' in content:
                stats['has_global_styles'] += 1
            if 'global-scripts.js' in content:
                stats['has_global_scripts'] += 1
            if 'viewport' in content:
                stats['has_viewport'] += 1
            # Check for where the mega footer should be injected or if it's already there
            if 'id="mega-footer"' in content or '</body>' in content:
                stats['has_footer_target'] += 1
            else:
                footer_tag_missing.append(f)
    except:
        pass

print(f"Total HTML files: {stats['total']}")
print(f"Global Styles: {stats['has_global_styles']}")
print(f"Global Scripts: {stats['has_global_scripts']}")
print(f"Viewport Meta: {stats['has_viewport']}")
if footer_tag_missing:
    print(f"Missing footer injection point in: {footer_tag_missing[:5]}... ({len(footer_tag_missing)} total)")
