import Sequelize from 'sequelize'
import env from '../configs/env.js'

const sequelize = new Sequelize(env.pgUrl)
export default sequelize