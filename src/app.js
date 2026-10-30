import express from "express";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "VideoTube Backend is running !" });
});

export { app };
