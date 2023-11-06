import dotenv from 'dotenv'
dotenv.config()

const env = {
    pgUrl: process.env.PGURL,
    port: process.env.PORT
}

export default env