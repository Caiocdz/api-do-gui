const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`);
});

//PORT=3000
//DB_HOST=localhost
//DB_USER=root
//DB_PASSWORD=root
//DB_NAME=corrida_db
//DB_PORT=3306