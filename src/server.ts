import "dotenv/config";
import app from "./app";
import { connectDatabase } from "./config/database";
import { Logger } from "./library/Logger";

const port = Number(process.env.PORT) || 3000;
const mongoUri = process.env.MONGODB_URI;
const logger = new Logger();

if (!mongoUri) {
  logger.error("MONGODB_URI is not set. Copy .env.example to .env and configure it.");
  process.exit(1);
}

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase(mongoUri);
    app.listen(port, () => {
      logger.info(`Server listening on http://localhost:${port}`);
    });
  } catch (err) {
    logger.error("MongoDB connection failed:", err);
    process.exit(1);
  }
};

void startServer();
