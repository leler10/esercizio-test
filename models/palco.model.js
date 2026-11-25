
const { EntitySchema } = require('typeorm')

const PalscoSchema = new EntitySchema({
    name: 'Palco',
    tableName: 'palchi',
    columns: {
        id: {
            name: 'id',
            type: Number,
            primary: true,
            generated: true
        },
        name: {
            name: 'nome',
            type: String,
            unique: true,
            nullable: false
        },
        zone: {
            name: 'zona',
            type: String,
            nullable: false
        }
    },
    relations: {
        esibizione: {
            target: 'Esibizione',
            type: 'one-to-many',
            inverseSide: 'palco'
        }
    }
});

module.exports = { PalscoSchema }
