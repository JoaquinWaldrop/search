const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const list = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`);
    res.json({
      author: {
        name: "Joaquin",
        lastname: "Molina"
      },
      categories: list.data.filters.length > 0 ? list.data.filters.find( e => e.id === 'category').values[0]['path_from_root'].map( e => e.name ) : [],
      items: list.data.results.map( e => {
        return {
          id: e.id,
          title: e.id,
          price: {
            currency: e.currency_id,
            amount: Number.parseInt(e.price.toString().split(".")[0]),
            decimals: Number.parseInt(e.price.toString().split(".")[1]) || 0
          },
          picture: e.thumbnail,
          condition: e.condition,
          free_shipping: e.shipping.free_shipping
       }
      })
    });
  } catch (error) {
    res.send(new Error("error"))
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const product = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}`);
    const description = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}/description`);
    res.json({
      author: {
        name: "Joaquin",
        lastname: "Molina"
      },
      item: {
        id: product.data.id,
        title: product.data.title,
        price: {
          currency: product.data.currency_id,
          amount: Number.parseInt(product.data.price.toString().split(".")[0]),
          decimals: Number.parseInt(product.data.price.toString().split(".")[1]) || 0
        },
        picture: product.data.pictures[0].url,
        condition: product.data.condition,
        free_shipping: product.data.shipping.free_shipping,
        sold_quantity: product.data.sold_quantity,
        description: description.data.plain_text
      }
    });
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
