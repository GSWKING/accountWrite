var express = require('express');
var router = express.Router();
const UserNameModel = require('../../moudle/UserNameModel')
const md5 = require('md5')
// 注册
router.get('/reg', (req, res)=>{
    // 响应 HTML 内容
    res.render('auth/reg')
})

// 注册用户

router.post('/reg', (req, res)=>{
    console.log({...req.body})
    UserNameModel.create({...req.body,password:md5(req.body.password)}).then((data)=>{
        res.render('success',{msg:'注册成功',url:'/login'})
    }).catch((err)=>{
        res.send('注册失败~~')
    })
})

// 登录
router.get('/login',(req, res)=>{
    res.render('auth/login');
})

// 登录用户
router.post('/login',(req, res)=>{
    // 获取用户名和密码
    let {username, password} = req.body;
    UserNameModel.find({username:username,password:md5(password)}).
    then((data)=>{
        let dataI = data[0]
        console.log(dataI);
        console.log(data);
        if(!dataI){
            res.send('账号密码错误');
            return
        }else{
            req.session.username = dataI.username;
            req.session._id = dataI._id;
            res.render('success',{msg:'登录成功',url:'/account'})
        }
    }).catch((err)=>{
        res.status(500).send('登陆失败');
    })
})

// 退出登录
router.get('/logout',(req, res)=>{
    req.session.destroy((data)=>{
        console.log("测试输出数据 "+req.session);
        if(typeof req.session == 'undefined'){
            res.render('success',{msg:'退出成功~~',url:'/login'});  
        }else{
            res.render('error',{msg:'退出失败~~',url:'/account'});
        }
    })
})
// 使用post是为了防止link、script、image请求跨域误操作
router.post('/logout',(req, res)=>{
    req.session.destroy((data)=>{
        console.log("测试输出数据 "+req.session);
        if(typeof req.session == 'undefined'){
            res.render('success',{msg:'退出成功~~',url:'/login'});  
        }else{
            res.render('error',{msg:'退出失败~~',url:'/account'});
        }
    })
})
module.exports = router;