import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
const { DataTypes } = Sequelize;


const Book = db.define('books', {
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users', // Sesuaikan dengan nama tabel user
            key: 'id_user', // Sesuaikan dengan nama kolom primary key di tabel user
        },
    },
    id: {
        type: DataTypes.INTEGER,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    isbn: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    authors: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    original_publication_year: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    average_rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    ratings_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    small_image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

// Define the relationship with User
Book.belongsTo(Users, { foreignKey: 'id_user' });

(async () => {
    await db.sync();
})();

export default Book;