const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')

const app = express()
dotenv.config()

app.get('/search', async (req, res) => {
  try {
    const response = await axios.get(process.env.API_URL, {
      params: {
        format: 'json',
        keyword: 'React',
        applicationId: process.env.API_KEY
      }
    })
    console.log(response.data)
    res.json(response.data)
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`)
  }
})
app.listen(3003, () => {
  console.log('プロキシサーバ稼働中 ^. _ . ^ ');
})