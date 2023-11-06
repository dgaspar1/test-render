import Sequelize from 'sequelize';
import env from '../configs/env.js';

// const sequelize = new Sequelize(env.pgUrl);
const sequelize = new Sequelize('postgres://denyspg:E7okSR0Pt6huSjHoNkWK0vw9DJ8usdgA@dpg-cl4f0kiuuipc73a7essg-a.ohio-postgres.render.com/tweets_eszd?ssl=true', {
    dialect: 'postgres'
});

// config.db.database, config.db.user, config.db.password, {
//   host: config.host,
//   dialect:'mysql',
//   dialectModule: require('mysql2'),
// })

export default sequelize