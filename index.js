const _ = require("lodash");
const validate = require("validate.js");
const CALL = require("./lib/call");
const Common = require("./lib/common");

function Gomobile (options) {
    this.options = _.cloneDeep(options);
    const constraints = {
        login: {
            presence: true
        },
        password: {
            presence: true
        }
    }

    const error = validate(this.options, constraints);

    if(error) {
        return error;
    }

    if(!validate.isEmpty(options.demo) && options.demo == true)
        Common.enableDemo();

    console.log(Common.MAKE_SINGLE_STATIC_CALL);

    this.CALL = new CALL(this.options);
}

module.exports = function (options) {
    return new Gomobile (options);
}