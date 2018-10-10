const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectLocation(data) {
    let errors = {};
    data.projectLocation = !isEmpty(data.projectLocation) ? data.projectLocation : '';

    if (Validator.isEmpty(data.projectLocation)) {
        errors.projectLocation = 'Project Location cannot be empty!';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}