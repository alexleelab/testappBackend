import express from 'express';
import cors from 'cors'
import routes from './routes';
import db from './db'
const app = express();
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 4000;
db.connect()
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);
app.use('/', routes);