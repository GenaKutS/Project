const { Sequelize } = require("sequelize"); //імпорт сіквалайз і одразу деструктуризую

module.exports = new Sequelize( //експортуємо об'єкт
  process.env.DB_NAME, // Ім'я БД
  process.env.DB_USER, // Юзер
  process.env.DB_PASSWORD, // Пароль
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
