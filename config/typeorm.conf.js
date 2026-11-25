const { DataSource } = require("typeorm");
const path = require('node:path')
const AppDataSource = new DataSource({
    type: 'better-sqlite3',
    database: path.join(__dirname, '..', 'db', 'db.sqlite'),
    entities: [path.join(__dirname, '..', 'models', '*.js')],
    synchronize: true,
    logging: ['error']
})

module.exports = { AppDataSource }