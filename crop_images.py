from PIL import Image
import os

input_image = r"C:\Users\omara\.gemini\antigravity-ide\brain\6152ac3a-7c1b-4528-abb7-0e44b1ebbc52\media__1780996241393.png"
out_dir = r"C:\Users\omara\Music\mama list\Darrow\Mathwaa\FrontendReact\public\images"

try:
    img = Image.open(input_image)
    width, height = img.size
    
    # Signature is bottom left (red circle in user's image)
    # Stamp is bottom right (red circle in user's image)
    # Let's crop bottom 30% of the image
    
    # Signature box: left 0 to width*0.4, bottom 70% to 100%
    sig_box = (0, int(height*0.7), int(width*0.4), height)
    sig_img = img.crop(sig_box)
    sig_img.save(os.path.join(out_dir, "signature_crop.png"))
    
    # Stamp box: right 0.6 to 1.0, bottom 70% to 100%
    stamp_box = (int(width*0.6), int(height*0.7), width, height)
    stamp_img = img.crop(stamp_box)
    stamp_img.save(os.path.join(out_dir, "stamp_crop.png"))
    
    print("Cropped successfully!")
except Exception as e:
    print(f"Error: {e}")
