export const dateDiffInHours = (firstDate:Date, secondDate:Date) => {
    var _MS_PER_HOUR = 1000 * 60 * 60;
    var utc1 = Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate(), firstDate.getHours(), firstDate.getMinutes());
    var utc2 = Date.UTC(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate(), secondDate.getHours(), secondDate.getMinutes());
    return Math.floor((utc2 - utc1) / _MS_PER_HOUR);
}