
import express from "express"
import { router } from "./routers/shortener.routes.js";


const app = express()

const PORT = process.env.PORT || 3000;


app.use(express.static("public"))
app.use(express.urlencoded({ extended : true}))

app.set("view engine", "ejs")

app.use(router)

app.listen(PORT, () => {
  console.log(`server runing at http://localhost:${PORT}`);
});
