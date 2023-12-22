import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Books from "./BookModel.js";

const { DataTypes } = Sequelize;

const Bookmark = db.define('bookmarks', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

// Definisikan relasi dengan User dan Book
Bookmark.belongsTo(Users, { foreignKey: 'user_id' });
Bookmark.belongsTo(Books, { foreignKey: 'book_id' });

(async () => {
    await db.sync();
})();

export default Bookmark;
