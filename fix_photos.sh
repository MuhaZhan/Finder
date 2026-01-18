#!/bin/bash
cd /Users/sofi/Finder/Finder-Ftc/public

# Используем convert (ImageMagick) или sips для правильной обрезки
# Mentor1.jpg - обрезаем сверху в центре (лицо обычно в верхней части)
sips -z 280 400 Mentor1.jpg --out temp1.jpg && mv temp1.jpg Mentor1.jpg && echo "✅ Mentor1"

# Mentor2.jpg - обрезаем немного ниже (глаза в центре)
sips -z 280 400 Mentor2.jpg --out temp2.jpg && mv temp2.jpg Mentor2.jpg && echo "✅ Mentor2"

# Mentor3.jpg - обрезаем верхнюю часть
sips -z 280 400 Mentor3.jpg --out temp3.jpg && mv temp3.jpg Mentor3.jpg && echo "✅ Mentor3"

# Mentor4.jpg - обрезаем с фокусом на лицо
sips -z 280 400 Mentor4.jpg --out temp4.jpg && mv temp4.jpg Mentor4.jpg && echo "✅ Mentor4"

echo "Все фотки переделаны!"
