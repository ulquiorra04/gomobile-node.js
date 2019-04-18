const _ = require("lodash");
const validate = require("validate.js");
const axios = require("axios");
const Common = require("./common");

function CALL (options) {

    this.options = options;

    this._singleStaticCall = function (params) {
        console.log(params);
        let _params = _.merge(params, this.options);
        let constraint = {
            user: {
                presence: true,
            },
            scenarioId : {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    strict: true,
                    greaterThan: 0,
                    message: "Le scenarioId n'est pas valide"
                }
            }
        }

        let userConstrains = {
            phoneNumber: {
                presence: true,
                format: {
                    pattern: "0[5-7]{1}[0-9]{8}",
                    message: "ce n'est pas un telephone valide"
                }
            }
        }

        return new Promise((resolve, reject) => {
            let _error = validate(_params, constraint);
            if(_error) {
                reject(_error);
            }

            if(!validate.isObject(_params.user))
                reject({message: "l'attribut user doit être un objet json"})

            let _errorPhone = validate(_params.user, userConstrains);

            if(_errorPhone) {
                reject(_errorPhone);
            }

            axios.post(Common.MAKE_SINGLE_STATIC_CALL, _params)
                 .then(function (response) {
                     console.log(response);
                     resolve(response);
                 })
                 .catch(function (error) {
                    reject(error);
                 })
        });
    }

}

CALL.prototype.singleStaticCall = function (params) {
    const opts = _.cloneDeep(params);

    return this._singleStaticCall(opts);
    
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