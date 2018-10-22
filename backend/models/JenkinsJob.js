const Project = require('./Project');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JenkinsJobSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    project: {
        type: Project.schema,
        required: true,
    }
});

const JenkinsJob = mongoose.model('jenkins', JenkinsJobSchema);

module.exports = JenkinsJob;