import Book from "../models/BookModel.js";
import { Op } from "sequelize";

export const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            attributes: ["id_user", "id", "book_id", "isbn", "authors", "original_publication_year", "title", "average_rating", "ratings_count", "small_image_url"]
        });
        res.json({
            error: false,
            message: "buku berhasil",
            listbook: books
        });
    } catch (error) {
        console.error(error); // Tambahkan log error di sini
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

export const getBookById = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Book.findByPk(bookId, {
            attributes: ["id_user", "id", "book_id", "isbn", "authors", "original_publication_year", "title", "average_rating", "ratings_count", "small_image_url"]
        });

        if (!book) {
            return res.status(404).json({ msg: "Buku tidak ditemukan" });
        }

        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};