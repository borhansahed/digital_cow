"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, Keys) => {
    const finalObj = {};
    Keys.forEach(key => {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    });
    return finalObj;
};
exports.default = pick;
