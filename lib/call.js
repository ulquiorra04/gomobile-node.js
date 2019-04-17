const _ = require("lodash");
const validate = require("validate.js");

function CALL (options) {

    this.options = options;

    this._singleStaticCall = function (params) {
        console.log(params);
        let _params = _.merge(params, this.options);
        let constraint = {
            phone: {
                presence: true,
                format: {
                    pattern: "0[5-7]{1}[0-9]{8}",
                    message: "le format de telephone n'est pas valide"
                }
            }
        }
        console.log(_params);

        error = validate(_params, constraint);
        if(error) {
            throw error.phone;
            //console.error(error);
        }
        console.log("make single static Call");
    }

}

CALL.prototype.singleStaticCall = function (params) {
    const opts = _.cloneDeep(params);

    this._singleStaticCall(opts);
    
}

CALL.prototype.multipleStaticCall = function (params) {
    const opts = _.cloneDeep(params);
}

CALL.prototype.singleDynamicCall = function (params) {
    const opts = _.cloneDeep(params);
}

CALL.prototype.multipleDynamicCall = function (params) {
    const opts = _.cloneDeep(params);
}

module.exports = CALL;