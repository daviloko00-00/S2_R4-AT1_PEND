import 'dotenv/config'
import routes from "./routes/routes.js";
import express from "express";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors({
    origin: "/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("/", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/", routes);

const PORT = process.env.SERVER_PORT || 8081;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
});