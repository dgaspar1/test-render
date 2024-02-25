import express from 'express'
import Tweets from './models/Tweets.js'
import NewAuthors from './models/NewAuthors.js'
import env from './configs/env.js'
import { fileURLToPath } from 'url'
import path from 'path'
import Sequelize from 'sequelize'
import bodyParser from 'body-parser';

const app = express()
app.use(express.static('public'));
app.use(bodyParser.json());
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
    const tweets = await Tweets.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('lemmas')), 'tags']
      ]
    });

    let tags = []
    for(let i=0; i<tweets.length; i++){
        tags.push(tweets[i].dataValues.tags);
    }
    tags = tags.join(' ');
    const words = tags.replace(/[^\w\s]/g, '').split(/\s+/);
    const uniqueWords = [...new Set(words.filter(word => word.length > 0))];
    const sortedWords = uniqueWords.sort();

    res.json(sortedWords);
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


app.post('/insertAuthor', async (req, res) => {
  try {
    const { username, socialnetwork } = req.body;

    await NewAuthors.create({
      username,
      socialnetwork,
    });

    res.json({ message: 'Autor inserido com sucesso.' });
  } catch (error) {
    console.error('Erro ao inserir autor:', error);
    res.status(500).json({ message: 'Erro ao inserir autor.' });
  }
});

app.get('/getPolarityData', async (req, res) => {
  try {
    const { authors, themes } = req.query;

    const whereClause = {};
    if (authors) {
         whereClause.author = authors.split(',');
    }
    if (themes) {
        whereClause.lemmas = {
            [Sequelize.Op.like]: `%${themes}%`,
        };
    }

    const polarityData = await Tweets.findAll({
        attributes: ['author', 'id', 'tweetdate', 'polarity'],
        where: whereClause,
        order: [['tweetdate', 'ASC']],
    });

    res.json(polarityData);
  } catch (error) {
    console.error('Erro ao obter dados de polaridade:', error);
    res.status(500).json({ message: 'Erro ao obter dados de polaridade.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})