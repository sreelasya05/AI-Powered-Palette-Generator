from flask import Flask, request, jsonify
from flask_cors import CORS
from colorthief import ColorThief
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

def get_palette(image_bytes):
    color_thief = ColorThief(io.BytesIO(image_bytes))
    palette = color_thief.get_palette(color_count=5)
    return ['#%02x%02x%02x' % color for color in palette]

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def get_mood(palette):
    red, blue, green, dark, bright = 0, 0, 0, 0, 0

    for hex_color in palette:
        r, g, b = hex_to_rgb(hex_color)

        # Brightness threshold (simple luminance check)
        brightness = (r*299 + g*587 + b*114) / 1000

        if brightness < 50:
            dark += 1
        elif brightness > 200:
            bright += 1

        # Color dominance checks
        if r > g and r > b:
            red += 1
        elif b > r and b > g:
            blue += 1
        elif g > r and g > b:
            green += 1

    if dark >= 3:
        return "Dark"
    elif bright >= 3:
        return "Bright"
    elif red >= 2:
        return "Energetic"
    elif blue + green >= 2:
        return "Calm"
    else:
        return "Neutral"

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image = request.files['image']
    image_bytes = image.read()

    palette = get_palette(image_bytes)
    mood = get_mood(palette)

    # You can also change fonts/themes based on mood
    fonts_by_mood = {
        "Calm": ["Lora", "Open Sans"],
        "Energetic": ["Poppins", "Montserrat"],
        "Bright": ["Roboto", "Nunito"],
        "Dark": ["Merriweather", "Fira Sans"],
        "Neutral": ["Inter", "Noto Sans"]
    }

    themes_by_mood = {
        "Calm": "Soft Pastel",
        "Energetic": "Bold & Vivid",
        "Bright": "Minimal Light",
        "Dark": "Neon on Dark",
        "Neutral": "Classic Web"
    }

    fonts = fonts_by_mood.get(mood, ["Arial", "Verdana"])
    theme = themes_by_mood.get(mood, "Modern Default")

    return jsonify({
        'palette': palette,
        'mood': mood,
        'fonts': fonts,
        'theme': theme
    })

if __name__ == '__main__':
    print("Flask server starting...")
    app.run(debug=True)
