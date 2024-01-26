const jwt = require('jsonwebtoken');
const {SECRET} = require('../config/config')
module.exports = (req, res, next)=>{
    // console.log("req值"+req.body);
    let token = req.get('token');
    // console.log('token ' + token);
    jwt.verify(token,SECRET,(err, data)=>{
        if(err){
            return res.json({
            code: '2003',
            msg: '请登录~~',
            data: null
            });
        }
        console.log(data);
        // 输出时不能直接输出 req.user
        req.user = data;
        // req.user = {
        //     username: data.username,
        //     password: data.password,
        //     iat: data.iat,
        //     exp: data.exp
        // };
        next();
    })
}