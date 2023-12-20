import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
    try {
        // Cek apakah pengguna sudah login
        if (req.user) {
            // Jika sudah login, hanya tampilkan informasi pengguna yang login
            res.json(req.user);
        } else {
            // Jika belum login, tampilkan semua data pengguna
            const users = await Users.findAll({
                attributes: ['id_user', 'name', 'email']
            });
            res.json(users);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;

    // Periksa apakah password dan confirmPassword cocok
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    }

    try {
        // Periksa apakah email atau username sudah ada dalam database
        const existingUser = await Users.findOne({
            where: {
                [Op.or]: [{ email: email }, { name: name }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ msg: "Email atau username sudah digunakan" });
        }

        // Jika email atau username belum ada, buat entri baru
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });

        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });
        
        if (!user || user.length === 0) {
            return res.status(400).json({ msg: "User not found" });
        }

        const match = await bcrypt.compare(req.body.password, user[0].password);
        
        if (!match) {
            return res.status(400).json({ msg: "Wrong Password" });
        }

        const userId = user[0].id_user;
        const name = user[0].name;
        const email = user[0].email;

        // Add user_id and username to the response
        const response = {
            user_id: userId,
            username: name,
            accessToken: jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '12h'
            })
        };

        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id_user: userId
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        // Send the modified response
        res.json(response);
    } catch (error) {
        res.status(404).json({ msg: "Email tidak ditemukan" });
    }
}


export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id_user;
    await Users.update({ refresh_token: null }, {
        where: {
            id_user: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}