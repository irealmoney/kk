const autobind = require('auto-bind');



module.exports = class middleware {
    constructor(){
        autobind(this);
    }

    alert(req , data) {
        let title = data.title || '',
            message = data.message || '',
            type = data.type || 'info',
            button = data.button || null,
            timer = data.timer || 2000;

        req.flash('sweetalert' , { title , message , type , button , timer});
    }
}