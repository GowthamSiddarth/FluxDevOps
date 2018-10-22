const ProjectLocation = require('./ProjectLocation');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    location: {
        type: ProjectLocation.schema,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    buildCommand: {
        type: String,
        required: true,
    },
    deployCommand: {
        type: String,
        required: true,
    }
});

const Project = mongoose.model('projects', ProjectSchema);

module.exports = Project;