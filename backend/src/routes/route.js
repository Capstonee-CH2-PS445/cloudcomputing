import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getBooks, getBookById } from "../controllers/BookController.js";

const router = express.Router();

// akun
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.post('/refreshToken', refreshToken);
router.delete('/logout', Logout);
// buku
router.get('/books', getBooks);
router.get('/books/:bookId', getBookById);

export default router;