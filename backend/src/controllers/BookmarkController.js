// controllers/BookmarkController.js
import Bookmark from '../models/BookmarkModel.js';
import Book from '../models/BookModel.js';

export const addBookmark = async (req, res) => {
  try {
    // Dapatkan informasi pengguna dari token yang telah diverifikasi
    const userId = req.user.userId;

    // Dapatkan parameter dari permintaan
    const { bookId } = req.params;

    // Cari buku berdasarkan primary key (bookId)
    const book = await Book.findByPk(bookId);

    // Jika buku tidak ditemukan, kembalikan respon 404
    if (!book) {
      return res.status(404).json({ error: 'Buku tidak ditemukan' });
    }

    // Periksa apakah bookmark sudah ada
    const existingBookmark = await Bookmark.findOne({
      where: {
        user_id: userId,
        book_id: bookId,
      },
    });

    // Jika bookmark sudah ada, kembalikan respon 400
    if (existingBookmark) {
      return res.status(400).json({ error: 'Bookmark sudah ada' });
    }

    // Buat bookmark baru
    const newBookmark = await Bookmark.create({
      user_id: userId,
      book_id: bookId,
    });

    // Perbarui field id_user di tabel books
    await book.update({ id_user: userId });

    // Kembalikan respon sukses
    return res.status(201).json(newBookmark);
  } catch (error) {
    console.error(error);

    // Ubah respon kesalahan untuk memberikan informasi lebih rinci
    return res.status(500).json({ error: `Kesalahan Server Internal: ${error.message}` });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    // Dapatkan informasi pengguna dari token yang telah diverifikasi
    const userId = req.user.userId;

    // Dapatkan parameter dari permintaan
    const { bookId } = req.params;

    // Hapus bookmark berdasarkan user_id dan book_id
    const deletedBookmark = await Bookmark.destroy({
      where: {
        user_id: userId,
        book_id: bookId,
      },
    });

    // Jika bookmark berhasil dihapus, kembalikan respon sukses
    if (deletedBookmark) {
      // Hapus referensi id_user di tabel books jika tidak ada bookmark lagi untuk buku tersebut
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
      // Jika bookmark tidak ditemukan, kembalikan respon 404
      return res.status(404).json({ error: 'Bookmark tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);

    // Ubah respon kesalahan untuk memberikan informasi lebih rinci
    return res.status(500).json({ error: `Kesalahan Server Internal: ${error.message}` });
  }
};
