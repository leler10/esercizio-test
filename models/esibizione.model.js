const { EntitySchema, JoinColumn } = require('typeorm')

const esibizioneSchema = new EntitySchema({
    name: 'Esibizione',
    tableName: 'esibizioni',
    columns: {
        id: {
            name: 'id',
            type: Number,
            primary: true,
            generated: true
        },
        artista: {
            name: 'artista',
            type: String,
            nullable: false
        },
        genere: {
            name: 'genere',
            type: String,
            nullable: false
        },
        slot: {
            name: 'slot',
            type: Number,
            nullable: false
        }
    },
    relations: {
        palco: {
            target: 'Palco',
            type: 'many-to-one',
            joinColumn: { name: 'palco_id' }
        }
    },
    uniques: [{
        name: 'slot_per_esibizioni',
        columns: ['palco', 'slot']
    }]
});

module.exports = { esibizioneSchema }
