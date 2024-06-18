import cors from "cors";
import dotenv from "dotenv";
import app from "./app";

dotenv.config({
  path: "../.env",
});

const CORS_OPTIONS = {
  origin: `http://localhost:${process.env.FRONTEND_PORT}`,
};
app.use(cors(CORS_OPTIONS));

const port = process.env.BACKEND_PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
