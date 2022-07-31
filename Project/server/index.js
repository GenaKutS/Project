require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const errorHandler = require("./middleware/ErrrorHandlingMiddleware");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
//app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

app.use("/api", router);

//обработка ошибок должен быть  последний Middleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate(); //для підключення до БД
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
