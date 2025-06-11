import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import './model/association.js';

dotenv.config();
import { db_config } from './model/config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

db_config.sync({}).then(() => {
  console.log("Database connected successfully");
}).catch((err) => {
  console.error("Error connecting to the database:", err);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});