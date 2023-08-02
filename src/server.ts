import "dotenv/config";
import { app } from "./app";

const PORT = process.env.PORT || 3000;

const server = async () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

server();
