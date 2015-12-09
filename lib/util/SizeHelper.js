export function getPxToNumber(str) {
    return Number(str.replace('px',''));
}

export function getInnerWidth(el) {
    var style = window.getComputedStyle(el, null);
    return getPxToNumber(style.getPropertyValue('width'));
}

export function getInnerHeight(el) {
    var style = window.getComputedStyle(el, null);
    return getPxToNumber(style.getPropertyValue('height'));
}
