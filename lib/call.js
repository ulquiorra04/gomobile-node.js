const _ = require("lodash");
const validate = require("validate.js");
const unirest = require("unirest");
const Common = require("./common");

function CALL (options) {

    this.options = options;

    this._singleStaticCall = function (params) {
        //console.log(params);
        let _params = _.merge(params, this.options);
        console.info(_params);
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
                return reject(_error);
            }

            if(!validate.isObject(_params.user))
                return reject({message: "l'attribut user doit être un objet json"})

            let _errorPhone = validate(_params.user, userConstrains);

            if(_errorPhone) {
                return reject(_errorPhone);
            }

            _params.user = JSON.stringify(_params.user);
            unirest.post(Common.MAKE_SINGLE_STATIC_CALL)
                    .send(_params)
                    .then((response) => {
                        console.log(response.code)
                        if(response.code === 200)
                            resolve(response.body)
                        else
                            reject("Error while processing")
                        //console.log(response);
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