const {readFileSync} = require('node:fs')
const path = require('node:path')
const SEED = path.join(__dirname, '..', 'seeds','seme.sql')

async function PopolaDatabase (dataSource){
    await dataSource.transaction (async (manager) => {
        const palchi = await manager.count('Palco')
        const esibizioni = await manager.count('Esibizione')

        if(palchi !== 0 || esibizioni !== 0){
            return console.log('Database_Popolato')
        }
        const sql = readFileSync(SEED, 'utf-8')
        const istruzioni = sql
            .split(';')
            .map((istruzione) => istruzione.trim())
            .filter(Boolean)

        for (const istruzione of istruzioni){
            await manager.query(istruzione)
        }
    })
};
module.exports = {PopolaDatabase}