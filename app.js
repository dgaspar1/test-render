import express from 'express'
import Tweets from './models/Tweets.js'
import env from './configs/env';

const app = express();
const port = env.PORT || 8080;

app.get('/', async (req, res)=>{
    res.status(200).json({status: 'success'})
})

app.get('/getTweets', async (req, res) => {
  try {
    const tweets = await Tweets.findAll();
    res.json(tweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter os tweets.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});