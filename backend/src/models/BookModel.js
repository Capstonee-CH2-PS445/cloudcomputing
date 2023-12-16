// BookModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Book = db.define('books', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    isBookmarked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    freezeTableName: true
});

export default Book;
