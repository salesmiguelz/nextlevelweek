const express = require("express");
const server = express()


//Pegar o banco de dados

const db = require("./database/db")

//Configuração da pasta pública
server.use(express.static("public"))

//Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))


//Utilizando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



//Configurar caminhos da minha aplicação
//Página inicial
//req: Requisição
//res: Respohttps://imgur.com/a/juGHYoPsta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título" })
})

server.get("/create-point", (req, res) => {

    //Query strings da nossa url
    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: O corpo do nosso formulário

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (
            ?,?,?,?,?,?,?
    );

 `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)//Resposta do db.run
        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)//Dados, valores, função callback(chamada depois de ocorrer um evento(registro no banco de dados, no caso)). Caso a função retorne erro, ele vai display esse erro no console
})

server.get("/search", (req, res) => {
    const search = req.query.search

    if(search == ''){
        return res.render("search-results.html", { total: 0 })
    } else{

    }

    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length 

        return res.render("search-results.html", { places: rows, total })
    })
})
//Ligar o servidor
server.listen(3000)
