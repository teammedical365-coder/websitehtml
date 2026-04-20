import os
import re

def remove_map_from_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find the Google Map wrap div and its content (iframe)
    # This handles optional comments and various indentations/newlines
    pattern = re.compile(r'<!--\s*Google Map embed\s*-->\s*<div class="mf-map-wrap">.*?</div>', re.DOTALL)
    
    if "mf-map-wrap" in content:
        new_content = pattern.sub('', content)
        # If the pattern didn't match (e.g. no comment), try just the div
        if new_content == content:
            new_content = re.sub(r'<div class="mf-map-wrap">.*?</div>', '', content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
    return False

def main():
    root_dir = r"c:\Users\USER\Downloads\websitehtml-main\websitehtml-main"
    count = 0
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                if remove_map_from_file(file_path):
                    print(f"Removed map from: {file_path}")
                    count += 1
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    main()
