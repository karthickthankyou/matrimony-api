const express = require('express');

const app = express();


app.get('/', (req, res) => {
  res.send({ msg: 'Hello there.' })
})

const server = app.listen(4000, () => {
  console.log('Server running on 4000');

})
