import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import LivePreview from './LivePreview';


function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [palette, setPalette] = useState([]);
  const [mood, setMood] = useState('');
  const [fonts, setFonts] = useState([]);
  const [theme, setTheme] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    setPreviewUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setPalette(response.data.palette);
      setMood(response.data.mood);
      setFonts(response.data.fonts);
      setTheme(response.data.theme);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // Mood-based background color
  useEffect(() => {
    const moodBackgrounds = {
      Neutral: '#f5f5f5',
      Dark: '#9ba6b2',
      Bright: '#fef9ef',
      Energetic: '#fff4e6',
      Calm: '#e6f7ff',
    };
    document.body.style.backgroundColor = darkMode ? '#121212' : (moodBackgrounds[mood] || '#f5f7fa');
  }, [mood, darkMode]);

  // Google Fonts loader
  useEffect(() => {
    if (fonts.length) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fonts[0].replace(
        ' ',
        '+'
      )}&family=${fonts[1]?.replace(' ', '+')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, [fonts]);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="toggle-switch" onClick={() => setDarkMode(!darkMode)}>
        <div className={`switch ${darkMode ? 'dark' : ''}`}>
          <div className="slider">{darkMode ? '🌙' : '☀️'}</div>
        </div>
        <span className="toggle-label">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
      </div>

      <h1 className="title">🎨 AI-Powered Palette Generator</h1>

      <label className="upload-btn">
        <input type="file" accept="image/*" onChange={handleUpload} />
        Upload Image
      </label>

      {previewUrl && <img src={previewUrl} alt="Preview" className="preview-img" />}

      {palette.length > 0 && (
        <div className="result-section fade-in">
          <h2>🌈 Color Palette</h2>
          <div className="palette">
            {palette.map((color, i) => (
              <div
                key={i}
                className="color-circle"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <div className="info-section">
            <p><strong>Mood:</strong> {mood}</p>
            <p><strong>Fonts:</strong> {fonts.join(', ')}</p>
            <p><strong>Suggested UI Theme:</strong> {theme}</p>
          </div>
        </div>
      )}
      <LivePreview palette={palette} fonts={fonts} mood={mood} />
    </div>
  );
}

export default App;
