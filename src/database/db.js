//Importar a dependência do sqlite3

const sqlite3 = require("sqlite3").verbose() //Verbose dá mais informações no console


//Criar o objeto que irá fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//Utilizar o objeto de banco de dados para nossas operações

db.serialize(() => {
//     //Por meio de comandos SQL, eu vou:

//     //Criar uma tabela 

//     db.run(`  
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //Inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (
//             ?,?,?,?,?,?,?
//     );

//  `
//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//         "Papersider",
//         "Papéis e Papelão",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)//Resposta do db.run
//     }

    // db.run(query, values, afterInsertData)//Dados, valores, função callback(chamada depois de ocorrer um evento(registro no banco de dados, no caso)). Caso a função retorne erro, ele vai display esse erro no console



    //Consultar dados da tabela
    // db.all(`SELECT id FROM places`, function (err, rows) {//Função callback que ou dá erro, ou apresenta ou dados em coluna
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    // })


    //Deletar um dado da tabela

    // db.run(`DELETE FROM places WHERE id = ?`, [12], function (err) {
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso")

    // })

    //Próximo id é o 12
 })
