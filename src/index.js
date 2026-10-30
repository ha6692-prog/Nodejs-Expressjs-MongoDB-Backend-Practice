import "dotenv/config";

import { app } from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 8000;

console.log("Starting VideoTube backend...");

connectDB()
  .then(() => {
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Application startup failed:", error.message);
    process.exit(1);
  });
