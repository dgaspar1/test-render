import Sequelize from 'sequelize';
import sequelize from '../db/db.js'

const Tweets = sequelize.define('tweets', {
        text: {
            type: Sequelize.TEXT
        },
        author: {
            type: Sequelize.STRING
        },
        lemmas: {
            type: Sequelize.TEXT
        },
        polarity: {
            type: Sequelize.FLOAT
        }    
    },
    {
        timestamps: false
    }
);

export default Tweets