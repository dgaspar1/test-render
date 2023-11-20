import express from 'express'
import Tweets from './models/Tweets.js'
import env from './configs/env.js'
import { fileURLToPath } from 'url'
import path from 'path'
import Sequelize from 'sequelize'

const app = express()
app.use(express.static('public'));
const port = env.port || 8080

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', async (req, res)=>{
    res.sendFile('index.html', { root: __dirname })
})

app.get('/grafico', async (req, res)=>{
    res.sendFile('exemploGrafico.html', { root: __dirname })
})

app.get('/getTweets', async (req, res) => {
  try {
    const tweets = await Tweets.findAll()
    res.json(tweets)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao obter os tweets.' })
  }
})

app.get('/getAuthors', async (req, res) => {
  try {
    const authors = await Tweets.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('author')), 'author']
      ]
    })

    res.json(authors)
  } catch (error) {
    console.error('Erro ao selecionar autores distintos:', error)
    res.status(500).json({ message: 'Erro ao selecionar autores distintos.' })
  }
})

app.get('/getTags', async (req, res) => {
  try {
    const tags = await Tweets.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('lemmas')), 'tags']
      ]
    })

    res.json(tags)
  } catch (error) {
    console.error('Error: ', error)
    res.status(500).json({ message: 'Erro ao selecionar autores distintos.' })
  }
})

app.get('/getTweetsByAuthors', async (req, res) => {
  try {
    const authors = req.query.authors.split(',')
    const tweets = await   Tweets.findAll({
        where: {
            author: authors
        }
    })
    res.json(tweets)
  } catch (error) {
    console.error('Error: ', error)
    res.status(500).json({ message: 'Erro ao selecionar autores distintos.' })
  }
})

app.get('/getAuthorsByTag', async (req, res) => {
  try {
    const tag = req.query.tag
    const authors = await Tweets.findAll({
        where: {
            lemmas: {
                [Sequelize.Op.like]: `%${tag}%`
            }
        },
        attributes: ['author'], 
        group: ['author']
    })
    res.json(authors)
  } catch (error) {
    console.error('Error: ', error)
    res.status(500).json({ message: 'Erro ao selecionar autores distintos.' })
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})