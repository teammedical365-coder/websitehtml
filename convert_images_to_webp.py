import os
import re
from pathlib import Path
from PIL import Image

def optimize_and_convert_images():
    img_dirs = [Path("img/redesign"), Path("img"), Path("images"), Path(".")]
    converted = {}
    
    for d in img_dirs:
        if not d.exists():
            continue
        for ext in ["*.png", "*.jpg", "*.jpeg"]:
            for img_path in d.glob(ext):
                if img_path.name.startswith(".") or "scratch" in str(img_path):
                    continue
                # Don't convert favicon/logo if special
                webp_path = img_path.with_suffix(".webp")
                try:
                    with Image.open(img_path) as im:
                        orig_size = img_path.stat().st_size
                        # Convert RGBA / P / RGB
                        if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
                            im = im.convert("RGBA")
                        else:
                            im = im.convert("RGB")
                        
                        # Resize if excessively large (e.g. > 1400px width)
                        max_w = 1200
                        if im.width > max_w:
                            ratio = max_w / float(im.width)
                            new_h = int(float(im.height) * ratio)
                            im = im.resize((max_w, new_h), Image.Resampling.LANCZOS)
                        
                        im.save(webp_path, "WEBP", quality=80, method=6)
                        new_size = webp_path.stat().st_size
                        savings = ((orig_size - new_size) / orig_size) * 100
                        print(f"Converted {img_path.name} -> {webp_path.name}: {orig_size//1024}KB -> {new_size//1024}KB (-{savings:.1f}%)")
                        converted[img_path.name] = webp_path.name
                except Exception as e:
                    print(f"Error on {img_path}: {e}")
    return converted

if __name__ == "__main__":
    optimize_and_convert_images()
