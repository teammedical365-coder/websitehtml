import os

def check_footer():
    total = 0
    with_footer = 0
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.html'):
                total += 1
                try:
                    with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                        if 'id="mega-footer"' in f.read():
                            with_footer += 1
                except:
                    pass
    print(f"Total HTML files: {total}")
    print(f"Files with Mega Footer: {with_footer}")

if __name__ == "__main__":
    check_footer()
