const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
