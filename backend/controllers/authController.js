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
  const { name, email, address, password, role } = req.body;
  if (password.length < 8 || password.length > 16) {
    return res.status(400).json({
      message: "Password must be between 8 and 16 characters.",
    });
  }
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (!hasUpperCase || !hasSpecialChar) {
    return res.status(400).json({
      message:
        "Password must include at least one uppercase letter and one special character.",
    });
  }

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
      role,
      address
    });

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      secret,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      token,
      userId: newUser.id,
      role: newUser.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    try {
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid old password" });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}