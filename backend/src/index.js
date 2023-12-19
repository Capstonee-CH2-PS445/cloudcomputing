import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
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
app.use(cookieParser());

app.use(verifyToken);

app.use(express.json());
app.use(router);

app.listen(8080, () => console.log('Server running at port 8080'));