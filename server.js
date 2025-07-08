const express= require('express');
const colors = require('colors');
const cors= require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

//dot env config
dotenv.config();

// DB connection
connectDB();
// Initialize express app
const app = express();

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//route
//url => http://localhost:8000/
app.use('/api/v1/test', require('./routes/testRoute'));
app.use('/api/v1/auth', require('./routes/authRoute'));
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/restaurant',require('./routes/restaurantRoutes'))
app.use('/api/v1/category',require('./routes/categoryRoutes'));
app.use('/api/v1/food',require('./routes/foodRoutes'))
app.use('/api/v1/order',require('./routes/foodRoutes'));

app.get('/', (req, res) => {
    return res.status(200).send('<h1>Hello,FOOD App!</h1>');
})
//port
const PORT=process.env.PORT || 5000;
//listening to the port
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`.white.bgCyan);
})