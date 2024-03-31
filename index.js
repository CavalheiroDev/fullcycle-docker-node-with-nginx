const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    const connection = mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'root',
        database: 'nodedb'
    });

    connection.query(`INSERT INTO people(name) VALUES ('Gabriel')`);

    let html = '<h1>Full Cycle Rocks!</h1>';

    connection.query("SELECT * from people", function (error, result, fields) {
        if (error) throw error;

        result.forEach(function (element) {
            html = html + `<br> - ${element.name} ${element.id}`
        });

        res.send(html)
    });

    connection.end();
});


app.listen(PORT, () => {
    console.log('Rodando na porta ' + PORT)
});