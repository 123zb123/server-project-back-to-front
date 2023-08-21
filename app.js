import express from 'express';
import productsRouter from './api/products/router.products.js';
import usersRuoter from './api/users/router.users.js'
import morgan from 'morgan';
import cors from 'cors';

const port = 8200;
const app = express();

app.use(express.json());

app.use(morgan('dev'))


// const corsOptions = {
//     origin: 'C:\\Users\\ZVIKA\\Documents\\project2\\Dom Project\\shop.js', // Specify the allowed origin
//     methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],     // Specify allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
// };

// app.use(cors(corsOptions)); 

app.use(cors())


app.use('/api/products', productsRouter)

app.use('/api/users', usersRuoter)


app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});
