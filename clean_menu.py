import os
import re

def clean_menu():
    # Targeted patterns to remove
    patterns = [
        re.compile(r'^\s*<li><a href="free-webpage"><span>Ezovion Free Webpage</span></a></li>\s*$', re.MULTILINE),
        re.compile(r'^\s*<li><a href="templates"><span>Templates</span></a></li>\s*$', re.MULTILINE)
    ]
    
    count = 0
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.html'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    for pattern in patterns:
                        new_content = pattern.sub('', new_content)
                    
                    if new_content != content:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        count += 1
                        if count % 100 == 0:
                            print(f"Processed {count} files...")
                except Exception as e:
                    print(f"Error processing {path}: {e}")
    
    print(f"Finished! Cleaned {count} files.")

if __name__ == "__main__":
    clean_menu()
