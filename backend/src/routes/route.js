import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken, urlencodedMiddleware } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getBooks, getBookById } from "../controllers/BookController.js";
import { addBookmark, removeBookmark } from "../controllers/BookmarkController.js";
const router = express.Router();

// account
router.get('/users', verifyToken, getUsers);
router.post('/regist', urlencodedMiddleware, Register);
router.post('/login', urlencodedMiddleware, Login);
router.post('/refreshToken', refreshToken);
router.delete('/logout', Logout);
// book
router.get('/books', getBooks);
router.get('/books/:bookId', getBookById);
// bookmark
router.post("/books/:bookId/bookmark", verifyToken, addBookmark);
router.delete("/books/:bookId/removebookmark", verifyToken, removeBookmark);

export default router;  