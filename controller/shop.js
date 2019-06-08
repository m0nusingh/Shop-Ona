
exports.getIndex = (req,res,next)=>{
    res.render('out/out');
}
exports.getLogin = (req,res,next)=>{
    res.render('out/login');
}
exports.getSignup = (req,res,next)=>{
    res.render('out/signup');
}