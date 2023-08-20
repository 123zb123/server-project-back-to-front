import express from 'express';
import productsRouter from './api/products/router.products.js';
import usersRuoter from './api/users/router.users.js'
import morgan from 'morgan';

const port = 8200;
const app = express();

app.use(express.json());

app.use(morgan('dev'))

app.use('/api/products', productsRouter)

app.use('/api/users', usersRuoter)


app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});
