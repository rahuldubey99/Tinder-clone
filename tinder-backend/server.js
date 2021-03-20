const express = require('express');
const mongoose = require('mongoose');
const Cards = require("./dbCards.js");
const Cors  = require('cors');

// password// KqFBTlPPl9Hr1q6s 
// App Config
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:KqFBTlPPl9Hr1q6s@cluster0.dkbu4.mongodb.net/tinderdb?retryWrites=true&w=majority'
// middlewares
app.use(express.json());
app.use(Cors());


// Db Config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
// Api Endpoints`
app.get("/", (req, res) => {
    res.send("ok ")
});

app.post("/tinder/cards", (req, res) => {
   const dbCard = req.body;
   Cards.create(dbCard,(err,data)=>{
       if(err){
           res.status(500).send(err)
       }
       else{
           res.status(201).send(data)
       }
   })
});

app.get("/tinder/cards", (req, res) => {
    Cards.find( (err, data) =>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
});


// Listner


app.listen(port, () => console.log(`Server running on port ${port}`));
