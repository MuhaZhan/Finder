from PIL import Image
import os

os.chdir('/Users/sofi/Finder/Finder-Ftc/public')

for i in range(1, 5):
    photo = f'Mentor{i}.jpg'
    if os.path.exists(photo):
        try:
            img = Image.open(photo)
            width, height = img.size
            print(f"{photo}: {width}x{height}")
            
            # Обрезаем верхнюю часть где лицо
            crop_width = min(400, width)
            crop_height = min(320, height)
            
            # Центрируем по ширине
            left = max(0, (width - crop_width) // 2)
            top = 0
            right = left + crop_width
            bottom = top + crop_height
            
            img_cropped = img.crop((left, top, right, bottom))
            img_resized = img_cropped.resize((400, 280), Image.Resampling.LANCZOS)
            img_resized.save(photo, quality=95)
            print(f"✅ {photo} обрезана")
        except Exception as e:
            print(f"❌ {photo}: {e}")
