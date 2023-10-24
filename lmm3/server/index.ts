import dotenv from "dotenv";

dotenv.config();

const port = 8080;

import app from "./app";

app.listen(port, () => console.log(`listening on port ${port}`));

process.on("unhandledRejection", (error) => {
  throw error;
});
