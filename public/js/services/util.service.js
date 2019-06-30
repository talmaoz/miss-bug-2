function getDate(time) {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let date  = new Date(time);
    return date.toLocaleDateString("en-US", options)
}

export default {
    getTime: getDate,
}