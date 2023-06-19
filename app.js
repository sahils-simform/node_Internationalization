/* eslint-disable no-console */
const express = require("express");
const path = require("path");
const { I18n } = require("i18n");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const i18n = new I18n({
  locales: ["en", "hi", "gu", "es"],
  directory: path.join(__dirname, "locales"),
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(i18n.init);

app.get("/test", (req, res) => {
  try {
    res.status(400).json({
      message: res.__("message"),
      greeting: res.__("greeting"),
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is runnning");
});
