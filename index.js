const express = require("express");
const connectDB = require('./Config/db');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
//To store data in request.body i:e we use body-parser
const bodyParser = require("body-parser");


//to start express
const app = express();
// Enable CORS for all routes
app.use(cors());

const PORT = process.env.PORT || 3000;

//conection to mongoDB
connectDB();

//middleware
app.use(bodyParser.json());

// Routes
app.use('/books', bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT,()=>{
    console.log(`server is runing on${PORT}`);
})