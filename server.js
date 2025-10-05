const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// GET: obtener usuarios
app.get('/usuarios', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'usuarios.json');
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('❌ Error leyendo usuarios.json:', error.message);
    res.status(500).json({ error: 'Error al leer usuarios.json' });
  }
});

// POST: registrar nuevo usuario
app.post('/usuarios', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'usuarios.json');
    const nuevoUsuario = req.body;

    // 🟢 Rol por defecto: cliente
    nuevoUsuario.rol = 'cliente';

    console.log('🟢 Nuevo usuario recibido:', nuevoUsuario);

    let data = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      if (raw.trim().length > 0) data = JSON.parse(raw);
    }

    data.push(nuevoUsuario);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log('✅ Usuario guardado correctamente');
    res.json({ mensaje: 'Usuario guardado correctamente' });
  } catch (error) {
    console.error('❌ Error guardando usuario:', error.message);
    res.status(500).json({ error: 'Error al guardar usuario' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});
