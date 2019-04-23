const _ = require("lodash");
const validate = require("validate.js");
const unirest = require("unirest");
const Common = require("./common");

function CALL (options) {

    this.options = options;

    /**
     * Make a single static Call
     * @param JSON
     * @return Promise
     */
    this._singleStaticCall = function (params) {
        let _params = _.merge(params, this.options);
        console.info(_params);
        let constraint = {
            user: Common.USER_VALIDTION,
            scenarioId :Common.SCENARIO_ID_VALIDATION
        }

        let userConstrains = {
            phoneNumber: Common.PHONE_VALIDATION
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
                    })
        });
    }


    this._multipleStaticCall = function (params) {
        let _params = _.merge(params, this.options);

        let constraint = {
            user: Common.USER_VALIDTION,
            scenarioId: Common.SCENARIO_ID_VALIDATION
        }


        return new Promise((resolve, reject) => {
            let _paramsError = validate(_params, constraint);
            if(_paramsError)
                return reject(_paramsError);
            
            if(!validate.isArray(_params.user) && validate.isEmpty(_params.user))
                return reject("You must send an array Of Object");
            
            _params.user = JSON.stringify(_params.user);
            unirest.post(Common.MAKE_MULTIPLE_STATIC_CALL)
                    .send(_params)
                    .then((response) => {
                        if(response.code === 200)
                            resolve(response.body)
                        else
                            reject("Error while processing");
                    })
        })
    }

    this._singleDynamicCall = function (params) {
        let _params = _.merge(params, this.options);

        let constraint = {
            user: Common.USER_VALIDTION,
            scenarioId: Common.SCENARIO_ID_VALIDATION
        }


        return new Promise((resolve, reject) => {
            let _paramsError = validate(_params, constraint);
            if(_paramsError)
                return reject(_paramsError);
            
            if(!validate.isArray(_params.user) && validate.isEmpty(_params.user))
                return reject("You must send an array Of Object");
            
            _params.user = JSON.stringify(_params.user);
            unirest.post(Common.MAKE_SINGLE_DYNAMIC_CALL)
                    .send(_params)
                    .then((response) => {
                        if(response.code === 200)
                            resolve(response.body)
                        else
                            reject("Error while processing");
                    })
        })
    }

    this._multipleDynamicCall = function (params) {

    }
}

CALL.prototype.singleStaticCall = function (params) {
    const opts = _.cloneDeep(params);

    return this._singleStaticCall(opts);
    
}

CALL.prototype.multipleStaticCall = function (params) {
    const opts = _.cloneDeep(params);

    return this._multipleStaticCall(opts);
}

CALL.prototype.singleDynamicCall = function (params) {
    const opts = _.cloneDeep(params);

    return this._singleDynamicCall(opts);
}

CALL.prototype.multipleDynamicCall = function (params) {
    const opts = _.cloneDeep(params);

    return this._multipleDynamicCall(opts);
}

module.exports = CALL;