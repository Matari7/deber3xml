const express = require('express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const app = express();
const port = 3000;

app.use(bodyParser.text({ type: 'application/xml' }));

// Ruta para obtener datos en formato XML
app.get('/api/data', (req, res) => {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject({ message: 'Hola desde el servidor!', data: [1, 2, 3, 4, 5] });
    res.type('application/xml');
    res.send(xml);
});

// Ruta para recibir datos en formato XML
app.post('/api/data', (req, res) => {
    xml2js.parseString(req.body, (err, result) => {
        if (err) {
            res.status(400).send('Error al parsear XML');
            return;
        }
        console.log(result);
        const username = result.user.username[0];
        const builder = new xml2js.Builder();
        const xmlResponse = builder.buildObject({ message: `Datos recibidos correctamente, ${username}!` });
        res.type('application/xml');
        res.send(xmlResponse);
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
