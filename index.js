const _ = require("lodash");
const validate = require("validate.js");

function Gomobile (options) {
    this.options = _.cloneDeep(options);
    const constraints = {
        username: {
            presence: true
        },
        password: {
            presence: true
        }
    }

    const error = validate(this.options, constraints);

    if(error) {
        throw(error);
    }
}

module.exports = function (options) {
    return new Gomobile (options);
}