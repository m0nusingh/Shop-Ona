
exports.getIndex = (req,res,next)=>{
    res.render('out/out');
}
exports.getLogin = (req,res,next)=>{
    res.render('out/login',{
        errorMessage : '',
        oldInput : ''
    });
}
exports.getSignup = (req,res,next)=>{
    res.render('out/signup',{
        errorMessage : '',
        oldInput : '',
        validationErrors: []
    });
}