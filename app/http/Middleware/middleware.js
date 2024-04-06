const autobind = require('auto-bind');



module.exports = class middleware {
    constructor(){
        autobind(this);
    }
}