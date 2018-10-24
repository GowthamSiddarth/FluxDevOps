const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommandSchema = new Schema({
    project_type: {
        type: String,
        required: true,
    },
    command: {
        type: String,
        required: true,
    }
});

const DefaultsSchema = new Schema({
    commands: [CommandSchema.schema]
});

const Defaults = mongoose.model("defaults", DefaultsSchema);

module.exports = Defaults;