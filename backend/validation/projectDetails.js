const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectDetails(data) {
    let errors = {};
    data.projectLocation = !isEmpty(data.projectLocation) ? data.projectLocation : '';
    data.projectType = !isEmpty(data.projectType) ? data.projectType : '';

    if (Validator.isEmpty(data.projectLocation)) {
        errors.projectLocation = 'Project Location cannot be empty!';
    }

    if (Validator.isEmpty(data.projectType) || Validator.equals(data.projectType, "Select Project Type")) {
        errors.projectType = 'Select Valid Project Type';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}