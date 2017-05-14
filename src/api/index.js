const express = require('express')
const router = express.Router()
const fetch = require('isomorphic-fetch')

router.get('/postcode', async (req, res) => {
  const url = `https://digitalapi.auspost.com.au/postcode/search.json?q=${req.query.q}`

  fetch(url, {
    method: 'get',
    headers: {
      'auth-key': '872608e3-4530-4c6a-a369-052accb03ca8',
    },
  })
  .then(res => res.json())
  .then((json) => {
    res.send(json)
  })
});

export default router;
