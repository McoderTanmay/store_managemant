import { Users } from "../model/association.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
        res.status(200).json({ token, userId: user.id, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        const token = jwt.sign({ id: newUser.id, role: newUser.role }, secret, { expiresIn: '1h' });
        res.status(201).json({ token, userId: newUser.id, role: newUser.role });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
