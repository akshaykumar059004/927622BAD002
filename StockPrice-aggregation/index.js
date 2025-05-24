const express = require("express");
//const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(express.json());





app.get("/", (req, res) => {
    res.send("ready!");
  });


app.listen(PORT,()=>{
    console.log("Sever running....");
});