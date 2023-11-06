import Sequelize from 'sequelize';
import env from './configs/env';

const sequelize = new Sequelize(env.PGURL);

export default sequelize