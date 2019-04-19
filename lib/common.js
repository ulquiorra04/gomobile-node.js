const BASE_DOMAIN = "http://osix.xyz";
const LOCAL_DOMAIN = "http://192.168.1.4";
const BASE_URL = "/backoffice/ScenariosUsers";

const initUrls = function (demo) {
    let url  = demo ? LOCAL_DOMAIN : BASE_DOMAIN;

    exports.MAKE_SINGLE_STATIC_CALL = url + BASE_URL + "/makeSingleStaticCalls";
    exports.MAKE_MULTIPLE_STATIC_CALL = "";
    exports.MAKE_SINGLE_DYNAMIC_CALL = "";
    exports.MAKE_MULTIPLE_DYNAMIC_CALL = "";
}

initUrls (false);

exports.enableDemo = function () {
    initUrls(true);
}