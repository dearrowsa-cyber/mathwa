from PIL import Image
import numpy as np
import os

# The new clean image - it's ONLY 189x186 = likely just the stamp
# Let's verify what's in it
input_image = r"C:\Users\omara\.gemini\antigravity-ide\brain\6152ac3a-7c1b-4528-abb7-0e44b1ebbc52\media__1780999847319.png"
out_dir = r"C:\Users\omara\Music\mama list\Darrow\Mathwaa\FrontendReact\public\images"

img = Image.open(input_image).convert("RGBA")
w, h = img.size
print(f"New clean image size: {w}x{h} - this is the STAMP only")

arr = np.array(img)

def autocrop(img_in, pad=15):
    arr = np.array(img_in)
    r, g, b, a = arr[:,:,0].astype(int), arr[:,:,1].astype(int), arr[:,:,2].astype(int), arr[:,:,3].astype(int)
    has_content = (a > 20) & ~((r > 235) & (g > 235) & (b > 235))
    if not has_content.any():
        return img_in
    rows = np.any(has_content, axis=1)
    cols = np.any(has_content, axis=0)
    rmin, rmax = np.where(rows)[0][[0, -1]]
    cmin, cmax = np.where(cols)[0][[0, -1]]
    rmin = max(0, rmin - pad)
    rmax = min(arr.shape[0] - 1, rmax + pad)
    cmin = max(0, cmin - pad)
    cmax = min(arr.shape[1] - 1, cmax + pad)
    return img_in.crop((cmin, rmin, cmax, rmax))

# This clean image = STAMP → save as stamp_crop.png
stamp_clean = autocrop(img)
stamp_clean.save(os.path.join(out_dir, "stamp_crop.png"))
print(f"Clean stamp saved: {stamp_clean.size}")

# For signature: use the old source image but with very aggressive red removal
old_image = r"C:\Users\omara\.gemini\antigravity-ide\brain\6152ac3a-7c1b-4528-abb7-0e44b1ebbc52\media__1780996906536.png"
old_img = Image.open(old_image).convert("RGBA")
ow, oh = old_img.size
print(f"Old image: {ow}x{oh}")

old_arr = np.array(old_img, dtype=np.float32)
r = old_arr[:,:,0]
g = old_arr[:,:,1]  
b = old_arr[:,:,2]

# Very aggressive red removal - any pixel where R dominates
red_mask = (r > 80) & (r > g * 1.3) & (r > b * 1.3) & (g < 180) & (b < 180)
print(f"Red pixels removed: {red_mask.sum()}")
old_arr[red_mask] = [255, 255, 255, 0]
old_img_clean = Image.fromarray(old_arr.astype(np.uint8))

# Signature is left portion of the old image (left ~38%)
sig_raw = old_img_clean.crop((50, int(oh*0.38), int(ow*0.40), int(oh*0.90)))
sig_clean = autocrop(sig_raw)
sig_clean.save(os.path.join(out_dir, "signature_crop.png"))
print(f"Signature saved: {sig_clean.size}")
print("Done!")
