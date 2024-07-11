const express =require('express') ;
const bodyParser =require('body-parser') ;
const cors =require('cors') ;
// const morgan =require('morgan') ;
const dotenv =require('dotenv') ;
const mongoose =require('mongoose') ;
const productRouter =require( './routes/productsRoutes.js');
const userRouter =require( './routes/userRoutes.js');
const billsRouter =require( './routes/billsRoutes.js');
const itemRouter =require( './routes/itemRoutes.js');

//require('colors');

dotenv.config();

//Connect with MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err.message);
});

const app = express();
const port = 5001;
//middlewares
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
// app.use(morgan("dev"));

//routes
app.use('/api/products/', productRouter);
app.use('/api/users/', userRouter);
app.use('/api/bills/', billsRouter);
app.use('/api/items/', itemRouter);



// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

//Listen
app.listen(process.env.PORT || port, () => {
    console.log(`App is running at http://localhost:${process.env.PORT || port}`);
  });
  