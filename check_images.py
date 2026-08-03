from PIL import Image
import os

images = [
    r"C:\Users\omara\.gemini\antigravity-ide\brain\6152ac3a-7c1b-4528-abb7-0e44b1ebbc52\media__1780996906536.png",
    r"C:\Users\omara\.gemini\antigravity-ide\brain\6152ac3a-7c1b-4528-abb7-0e44b1ebbc52\media__1780997154825.png"
]

for img_path in images:
    if os.path.exists(img_path):
        with Image.open(img_path) as img:
            print(f"Image {os.path.basename(img_path)}: format={img.format}, size={img.size}, mode={img.mode}")
