const mongoose = require('mongoose');

const issueSchema = {
    symptom: String,
    solutions: [String],
};

const WikiSchema = new mongoose.Schema({
    hardware: [issueSchema],
    windows: [issueSchema],
    internet: [issueSchema],
});

module.exports = mongoose.model('Wiki', WikiSchema);
