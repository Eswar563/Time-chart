const express = require("express");
const app = express();
const User = require('../myapp/models/User');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hrm-db');
app.use(express.json())



const initializeDBAndServer = async () => {
  try {
      app.listen(4000, () => {
      console.log("Server Running at http://localhost:4000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.post("/register", async (request, response) => {
  const { email } = request.body;
  const userDetails = {email};
  console.log(userDetails)
  const responses = await User.create(userDetails)
  response.send(responses)

 
});

app.get("/", async (request, response) => {
  
  const isUserExisting = await User.find({});
  console.log(isUserExisting, '>>>>>>>>>>>>>>>>>>>>>>>')
  response.send(isUserExisting)

 
});


app.get("/hello", (request, response) => {
  response.send("Hello World!");
});
app.listen(3000);