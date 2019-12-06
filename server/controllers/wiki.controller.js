'use strict';
const WikiModel = require('../models/wiki.model');

class WikiController {
    async get() {
        return await WikiModel.findOne({}).lean();
    }
}

module.exports = WikiController;
