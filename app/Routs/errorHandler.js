const express = require('express');
const router = express.Router();


router.all('*' , async (req, res , next)=>{
    try{
        res.statusCode = 404;
        throw new Error('چنین صفحه ای یافت نشد')
    } catch(err){
        next(err)
    }
    
})


router.use((err , req , res , next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || '';
    const stack = err.stack || '';

    const layout = {
        layout : 'errors/master' , 
        extractScript : false , 
        extracStyles : false 
    }

    return res.render(`errors/${statusCode}` , {...layout , message , stack})
})

module.exports = router;