const BASE_DOMAIN = "http://osix.xyz";
const LOCAL_DOMAIN = "http://192.168.1.4";
const BASE_URL = "/backoffice/ScenariosUsers";

const initUrls = function (demo) {
    let url  = demo ? LOCAL_DOMAIN : BASE_DOMAIN;

    exports.MAKE_SINGLE_STATIC_CALL = url + BASE_URL + "/makeSingleStaticCall";
    exports.MAKE_MULTIPLE_STATIC_CALL = url + BASE_URL + "/makeMultipleStaticCall";
    exports.MAKE_SINGLE_DYNAMIC_CALL = "";
    exports.MAKE_MULTIPLE_DYNAMIC_CALL = "";
}

exports.SCENARIO_ID_VALIDATION = {
    presence: true,
    numericality: {
        onlyInteger: true,
        strict: true,
        greaterThan: 0,
        message: "Le scenarioId n'est pas valide"
    }
}

exports.USER_VALIDTION = {
    presence: true
}

exports.PHONE_VALIDATION = {
    presence: true,
    format: {
        pattern: "0[5-7]{1}[0-9]{8}",
        message: "ce n'est pas un telephone valide"
    }
}

initUrls (false);

exports.enableDemo = function () {
    initUrls(true);
}