import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { addBook, updateBook, deleteBook, getBooks, addBookmark, removeBookmark, getBookById } from "../controllers/BookController.js";

const router = express.Router();

// akun
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.post('/refreshToken', refreshToken);
router.delete('/logout', Logout);
// buku
router.get('/books', getBooks);
router.post('/books', verifyToken, addBook);
router.put('/books/:bookId', updateBook);
router.delete('/books/:bookId', verifyToken, deleteBook);
router.post('/books/:bookId/bookmark', addBookmark);
router.delete('/books/:bookId/bookmark', removeBookmark);
router.get('/books/:bookId', getBookById);

export default router;