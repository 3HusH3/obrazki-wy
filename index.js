const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  const imagesDir = path.join(__dirname, 'public', 'images');
  fs.readdir(imagesDir, (err, files) => {
    if (err) return res.send('Błąd odczytu obrazków');
    const images = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
    if (images.length === 0) return res.send('Brak obrazków');
    const randomImage = images[Math.floor(Math.random() * images.length)];
    res.send(`
      <!DOCTYPE html>
      <html lang="pl">
      <head>
        <meta charset="UTF-8">
        <title>Losowy Obrazek</title>
        <link rel="stylesheet" href="/css/style.css">
      </head>
      <body>
        <div class="container">
          <img src="/images/${randomImage}" alt="Losowy obrazek">
        </div>
      </body>
      </html>
    `);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serwer działa na http://localhost:${PORT}`));