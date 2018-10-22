const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectLocationSchema = new Schema({
    scm: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    }
});

const ProjectLocation = mongoose.model("project_location", ProjectLocationSchema);

module.exports = ProjectLocation;