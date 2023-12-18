import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/route.js";
import { verifyToken } from "./middleware/VerifyToken.js";
dotenv.config();

const app = express();
try {
    await db.authenticate();
    console.log('Database Conected');
} catch (error) {
    console.error(error);
}

app.get('/', (req, res) => {
    res.send({
        message: "YUHU"
    })
})

app.use(verifyToken);
app.use(cors({ credentials: true, origin: 'http://localhost:5000' }));
app.use(cookieParser());

app.use(verifyToken);

app.use(express.json());
app.use(router);

app.listen(5000, () => console.log('Server running at port 5000'));