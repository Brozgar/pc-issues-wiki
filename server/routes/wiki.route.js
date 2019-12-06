const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const WikiCtrl = require('../controllers/wiki.controller');
const wikiCtrl = new WikiCtrl();

router.route('/').get(asyncHandler(getWiki));

async function getWiki(req, res) {
  const wiki = await wikiCtrl.get();
  await res.json(wiki);
}

module.exports = router;
