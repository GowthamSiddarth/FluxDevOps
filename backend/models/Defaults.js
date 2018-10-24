const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommandSchema = new Schema({
    project_type: {
        type: String,
        required: true,
    },
    build_command: {
        type: String,
        required: true,
    }
});

const DefaultsSchema = new Schema({
    commands: {
        type: [CommandSchema.schema],
        required: true,
    }
});

const Defaults = mongoose.model("defaults", DefaultsSchema);

module.exports = Defaults;