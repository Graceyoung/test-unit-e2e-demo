/**
 * Created by jiachenpan on 16/11/18.
 */

export function must(str) {
    // 不可为空
    return Boolean(str.trim());
}

export function isvalidUsername(str) {
    //用户名正则，6到14位字母、数字组合
    const reg = /^[a-zA-Z0-9]{6,14}$/;
    return reg.test(str);
}

export function isvalidPwd(str) {
    //密码正则，6到14位字母、数字组合
    const reg = /^[a-zA-Z0-9]{6,14}$/;
    return reg.test(str);
}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
}

export function validatePhone(str) {
    const reg = /^1[34578][0-9]{9}$/;
    return reg.test(str);
}

export function isvalidateNumber(str) {
    const reg = /^[0-9]*$/;
    return reg.test(str);
}
export function _typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}