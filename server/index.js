const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password', //Having a problem connecting to the server so had to change the password from the MySQL Workbench
    database: 'gamedb',
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/get', (req,res) => {
    const sqlSelect = 'Select * From gamedb.users;'
    db.query(sqlSelect, (err, result) => {
        if (err){console.log(err)};
        console.log(result)
        res.send(result)
    })
})

app.post('/api/insert', (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const sqlinsert = "INSERT INTO gamedb.users (first_name, last_name) VALUES (?,?)";
    db.query(sqlinsert, [first_name, last_name], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: "Failed to insert data" });
        } else {
            console.log(result);
            res.status(200).send({ message: "Data inserted successfully" });
        }
    });
});

app.delete('/api/delete/:id', (req,res) => {
    const id = req.params.id;
    const q = "DELETE FROM gamedb.users WHERE id = ?"
    db.query(q,id, (err, result) => {
        if (err){console.log(err)};
        console.log(result)
        res.send(result)
    })
})


app.put('/api/update/:id', (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const id = req.params.id
    const sqlupdate = "UPDATE gamedb.users SET first_name = ?, last_name = ? WHERE id = ?";
    db.query(sqlupdate, [first_name, last_name, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(600).send({ error: "Failed to update data" });
        } else {
            console.log(result);
            res.status(200).send({ message: "Data updated successfully" });
        }
    });
});

app.listen(3001, () => {
    console.log("running on port 3001")
})