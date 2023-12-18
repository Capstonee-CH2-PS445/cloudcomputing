const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql');

// Konfigurasi koneksi database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username MySQL Anda
    password: '', // Ganti dengan password MySQL Anda
    database: 'auth_db' // Ganti dengan nama database Anda
});

const namaFileCSV = 'Book.csv'; // Ganti dengan nama file CSV Anda

// Array untuk menyimpan data dari CSV
const data = [];

// Membaca file CSV
fs.createReadStream(namaFileCSV)
    .pipe(csv({ separator: ',' }))  // Sesuaikan karakter pemisah dengan file CSV Anda
    .on('data', (row) => {
        // Menghilangkan spasi ekstra dari setiap nilai dan mengganti nilai NULL dengan null
        const cleanedRow = Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key, value.trim() === '' ? null : value.trim()])
        );
        data.push(cleanedRow);
    })
    .on('end', () => {
        // Mengimpor data ke database
        connection.connect((err) => {
            if (err) {
                console.error('Error koneksi ke database:', err.message);
                return;
            }

            // Menyusun query untuk mengimpor data ke database
            const query = 'REPLACE INTO books (id_user, id, book_id, isbn, authors, original_publication_year, title, average_rating, ratings_count, small_image_url) VALUES ?';
            const values = data.map((row) => [row.id_user, row.id, row.book_id, row.isbn, row.authors, row.original_publication_year, row.title, row.average_rating, row.ratings_count, row.small_image_url]);

            // Menjalankan query
            connection.query(query, [values], (error, results) => {
                if (error) {
                    console.error('Error mengimpor data ke database:', error.message);
                } else {
                    console.log('Data yang diimpor:', values);
                    console.log('Data berhasil diimpor ke database.');
                }

                // Menutup koneksi database
                connection.end();
            });
        });
    })
    .on('error', (error) => {
        console.error('Error membaca file CSV:', error.message);
    });
