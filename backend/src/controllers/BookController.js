import Book from "../models/BookModel.js";
import { Op } from "sequelize";

export const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            attributes: ['id', 'title', 'author', 'description', 'isBookmarked']
        });
        res.json(books);
    } catch (error) {
        console.error(error); // Tambahkan log error di sini
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

export const addBook = async (req, res) => {
    try {
        const { title, author, description } = req.body;
        const newBook = await Book.create({ title, author, description });
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error); // Tambahkan log error di sini
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        const [updatedRows] = await Book.update(req.body, {
            where: {
                id: bookId
            }
        });

        if (updatedRows > 0) {
            res.json({ msg: "Buku berhasil diperbarui" });
        } else {
            res.status(404).json({ msg: "Buku tidak ditemukan" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;

        // Validasi ID buku
        if (!bookId) {
            return res.status(400).json({ msg: "ID buku harus disertakan" });
        }

        // Hapus buku dari database
        const deletedBook = await Book.destroy({
            where: {
                id: bookId,
            },
        });

        if (deletedBook === 0) {
            return res.status(404).json({ msg: "Buku tidak ditemukan" });
        }

        res.json({ msg: "Buku berhasil dihapus" });
    } catch (error) {
        console.error(error); // Tambahkan log error di sini
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

export const addBookmark = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ msg: "Buku tidak ditemukan" });
        }

        await book.update({ isBookmarked: true });
        res.json({ msg: "Bookmark berhasil ditambahkan" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

export const removeBookmark = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ msg: "Buku tidak ditemukan" });
        }

        await book.update({ isBookmarked: false });
        res.json({ msg: "Bookmark berhasil dihapus" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};
