const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');

router.get('/postcode', function (req, res) {
  const url = 'https://digitalapi.auspost.com.au/postcode/search.json?q=2000';
  fetch(url, {
    method: 'get',
    headers: {
      'auth-key': '872608e3-4530-4c6a-a369-052accb03ca8',
      'content-Type': 'application/octet-stream',
    },
  })
  .then(res => res.json());
});

export default router;
