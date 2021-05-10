import express from "express";
import http from "http";

import {sequelize} from "./database/database";
import routes from "./router/router";

import app from "./app"

const server = http.createServer(app)
const router = express.Router();
const port = process.env.port || 3000;





router.use('/api', routes)

app.use(express.json());
app.use(express.urlencoded());
app.use(router);

sequelize.sync()
  .then(() => {
    server.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    });
  })