# 🎨 AI-Powered Palette Generator

This project generates visually appealing color palettes using a frontend interface and a backend API. Users can preview palettes live and potentially use AI/image processing logic to derive palettes from context.

---

## Project Structure

```
palette-generator/
├── backend/
│   └── app.py              # Flask backend API
├── frontend/
│   ├── public/             # Public HTML and assets
│   ├── src/                # React source components
│   ├── package.json        # Frontend dependencies
│   └── ...
├── requirements.txt        # Python backend dependencies
└── README.md               # Project overview and setup guide
```

---

## STEPS

### Backend (Flask)

1. Navigate to the backend:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   venv\Scripts\activate       # Windows
   # OR
   source venv/bin/activate      # macOS/Linux
   ```

3. Install dependencies:
   ```bash
   pip install -r ../requirements.txt
   ```

4. Run the app:
   ```bash
   python app.py
   ```

---

### Frontend (React)

1. Navigate to the frontend:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

---

## Deployment

You can host the frontend using Vercel/Netlify and deploy the Flask backend via Render, Railway, or AWS Lambda (with API Gateway).

---

## Credits

Created by [sreelasya05](https://github.com/sreelasya05)

---


