
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const PORT = 5000
// const userRoute = require('./routes/user')
dotenv.config()

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/contacts", require("./routes/contact"));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));