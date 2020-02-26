require('newrelic');
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());


app.get(/icons/, function(req, res) {
    axios.get("http://localhost:3001"+req.url)
        .then((response) => {
            res.setHeader("content-type", "image/svg+xml")
            res.end(response.data)
        })
        .catch((err) => {
            res.end(err);
        })
})

app.get('/restaurants', function(req, res) {
    axios.get('http://localhost:3001/restaurants')
        .then((response) => {
            res.end(JSON.stringify(response.data))
        })
        .catch((err) => {
            res.end(err);
        })
})

app.get('/reservations', function(req, res) {
    axios.get('http://localhost:3002/reservations')
        .then((response) => {
            res.end(JSON.stringify(response.data))
        })
        .catch((err) => {
            res.end(err);
        })
})

app.get('/images/restaurants/:restaurantID', function(req, res) {
        const id = req.params.restaurantID;
        axios.get(`http://localhost:3004/images/restaurants/${id}`)
            .then((response) => {
                res.send(response.data)
        })
            .catch((err) => {
            res.send(err);
        })
});

app.post('/images', function(req,res){
    axios.post(`http://localhost://3004/images`, req.body)
        .then((response)=> {
            res.send(response.data)
        })
        .catch((err)=> {
            res.send(err);
        })
})

app.get('/popular-dishes-bundle.js', function(req, res) {
    axios.get('https://popular-dishes.s3-us-west-1.amazonaws.com/remi/bundle.js')
        .then((response) => {
            res.end(response.data);
        })
        .catch((err) => {
            res.end(err);
    })
})

app.get('/gallery-bundle.js', function(req, res) {
    axios.get('https://popular-dishes.s3-us-west-1.amazonaws.com/cole/bundle.js')
        .then((response) => {
            res.end(response.data);
        })
        .catch((err) => {
            res.end(err);
    })
})

app.get('/reservations-bundle.js', function(req, res) {
    axios.get('https://popular-dishes.s3-us-west-1.amazonaws.com/zach/bundle.js')
        .then((response) => {
            res.end(response.data);
        })
        .catch((err) => {
            res.end(err);
    })
})

app.listen(PORT, () => console.log('Listening on port: ' + PORT));
