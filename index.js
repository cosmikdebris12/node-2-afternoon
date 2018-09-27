require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const ctrl = require('./products_controller')
const port = process.env.PORT

const app=express();
app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING)
    .then(dbInstance=>{ //catches the database instance
        app.set('db',dbInstance) //sets the dbInstance value onto app
    })
    .catch(err=>console.log(err)) //.catch takes a callback function. If .catch is invoked it will display the err value in the console.log

app.get('/api/products',ctrl.getAll);

app.get('/api/products/:id',ctrl.getOne);

app.put('/api/products/:id',ctrl.update); //example url is /api/products/3?desc=bob

app.post('/api/products',ctrl.create);

app.delete('/api/products/:id',ctrl.delete);


app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})