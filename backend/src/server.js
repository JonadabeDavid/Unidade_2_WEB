const express = require("express");
const cors = require("cors")
const todosRoutes = require("./todos.routes")
const app = express();

app.use(express.json());
app.use(cors())
app.use(todosRoutes)

app.get("/health", (req, res) => {
    return res.json("Funcionando");
});

app.listen(3333, () => console.log("Porta 3333"));