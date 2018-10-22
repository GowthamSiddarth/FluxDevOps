const Project = require('./Project');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JenkinsSchema = new Schema({
    project: {
        type: Project,
        required: true,
    }
});

const Jenkins = mongoose.model('jenkins', JenkinsSchema);

module.exports = Jenkins;