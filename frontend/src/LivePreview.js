import React from 'react';

function getBrightness(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function LivePreview({ palette, fonts, mood }) {
  if (!palette.length || !fonts.length) return null;

  const primary = palette[0];
  const background = palette[1] || '#ffffff';
  const brightness = getBrightness(background);
  const textColor = brightness > 160 ? '#111' : '#fff';

  const fontPrimary = fonts[0];
  const fontSecondary = fonts[1] || fonts[0];

  return (
    <div style={{
      fontFamily: fontPrimary,
      backgroundColor: background,
      color: textColor,
      borderRadius: '12px',
      padding: '30px',
      marginTop: '40px',
      maxWidth: '600px',
      marginInline: 'auto',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '10px', fontFamily: fontPrimary }}>
        Boom! Here’s Your Theme ✨
      </h2>
      <p style={{ fontFamily: fontSecondary, marginBottom: '20px' }}>
        This picture is pure <strong>{mood}</strong>. <br />
        Fonts <em>{fontPrimary}</em> & <em>{fontSecondary}</em> bring the vibe alive.
      </p>
    </div>
  );
}

export default LivePreview;
