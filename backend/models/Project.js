const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    location: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
});

const Project = mongoose.model('projects', ProjectSchema);

module.exports = Project;