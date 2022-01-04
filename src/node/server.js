const express = require('express');
const bodyParser = require('body-parser');

var axios = require('axios');

const app = express();

app.use(bodyParser.json());

var rawJSON = undefined;

function getPrice(base, quote) {
axios.get('https://min-api.cryptocompare.com/data/price?fsym=' + base + '&tsyms=' + quote + '&api_key=1fa431c5eecbc3454e75716240f908e4997a47aeea8381991e3d236b4d1501c0')
  .then(function (response) {
    console.log(response.data);
    rawJSON = response.data;
  })
  .catch(function (error) {
    console.log(error);
  });

}

app.get('/price/', (req, res) => {

  const { base, quote } = req.query;

  getPrice(base, quote);

  res.json(rawJSON);

});

app.listen(3000, () => console.log('Server started on port 3000'));
