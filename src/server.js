import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import connect from "./config/mongo.js";
import swaggerUi from "swagger-ui-express"
import swaggerDocument from './swagger.js'

// set default timezone
process.env.TZ = 'Asia/Ho_Chi_Minh';

const app = express();
dotenv.config();

connect();

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const PORT = process.env.PORT;

router(app);

app.get('/', (req, res)=>{
    res.send('404 Not Found');
});

app.all('*', (req, res) =>{
    res.status(404).json({ status: "error", error: "404 Not Found!" });
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// call socket function

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});