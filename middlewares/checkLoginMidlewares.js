module.exports = (req, res, next)=>{
    console.log("session"+req.session.username);
    if(!req.session.username){
      return res.redirect('/login');
    }
    next();
  }