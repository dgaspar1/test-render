import Sequelize from 'sequelize'
import sequelize from '../db/db.js'

const NewAuthors = sequelize.define('newauthors', {
        username: {
            type: Sequelize.TEXT,
            primaryKey: true
        },
        socialnetwork: {
            type: Sequelize.TEXT
        }
    },
    {
        timestamps: false
    }
);

export default NewAuthors