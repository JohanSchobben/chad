import express from "express";
import routes from "./router/router";
const app = express();
const router = express.Router();

router.use('/api', routes)

app.use(express.json());
app.use(express.urlencoded());
app.use(router);

export default app;