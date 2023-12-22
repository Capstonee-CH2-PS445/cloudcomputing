import Bookmark from '../models/BookmarkModel.js';
import Book from '../models/BookModel.js';

export const addBookmark = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { bookId } = req.params;

    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Buku tidak ditemukan' });
    }

    const existingBookmark = await Bookmark.findOne({
      where: {
        user_id: userId,
        book_id: bookId,
      },
    });

    if (existingBookmark) {
      return res.status(400).json({ error: 'Bookmark sudah ada' });
    }

    const newBookmark = await Bookmark.create({
      user_id: userId,
      book_id: bookId,
    });

    await book.update({ id_user: userId });

    return res.status(201).json(newBookmark);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: `Kesalahan Server Internal: ${error.message}` });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { bookId } = req.params;

    const deletedBookmark = await Bookmark.destroy({
      where: {
        user_id: userId,
        book_id: bookId,
      },
    });

    if (deletedBookmark) {
      const remainingBookmarks = await Bookmark.count({
        where: {
          book_id: bookId,
        },
      });

      if (remainingBookmarks === 0) {
        await Book.update({ id_user: null }, { where: { book_id: bookId } });
      }

      return res.status(200).json({ message: 'Bookmark berhasil dihapus' });
    } else {
      return res.status(404).json({ error: 'Bookmark tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: `Kesalahan Server Internal: ${error.message}` });
  }
};
