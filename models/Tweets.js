import Sequelize from 'sequelize'
import sequelize from '../db/db.js'
import DataTypes from 'sequelize'

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
        },
        tweetdate: {
            type: DataTypes.DATE, 
        },
        createdat: {
            type: DataTypes.DATE, 
        }    
    },
    {
        timestamps: false
    }
);

export default Tweets