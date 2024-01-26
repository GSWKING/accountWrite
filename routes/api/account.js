const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
//导入 moment
const moment = require('moment');
const AccountModel = require('../../moudle/AccountModel');
const checkTokenMiddleWare = require('../../middlewares/checkTokenMidlewares');

//新增记录
router.post('/account', checkTokenMiddleWare, (req, res) => {
    //表单验证    
    //插入数据库
    AccountModel.create({
        ...req.body,
        //修改 time 属性的值
        time: moment(req.body.time).toDate()
    }).then((data)=>{
        res.json({
            code: '0000',
            msg:'创建成功',
            data:data
        })
        //成功提醒
    }).catch((err)=>{
        if(err){
        res.json({
            code:'1002',
            msg:'创建失败',
            data:null
        })
        return
        }
    });
});

//记账本的列表
router.get('/account', checkTokenMiddleWare, function(req, res, next) {
  //获取所有的账单信息
  // let accounts = db.get('accounts').value();
  //读取集合信息
  AccountModel.find().sort({time: -1})
  .then((data)=>{
    //响应成功的提示
    res.json({
        // 响应编号 
        code: '0000',
        // 响应的信息
        msg: '读取成功',
        // 响应的数据
        data: data
    });
  }).catch((err)=>{
    if(err){
      res.json({
        code: '1001',
        msg: '读取失败~~',
        data: null
      })
      return;
    }
  })
});

// 删除记录
router.delete('/account/:id', checkTokenMiddleWare, (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  AccountModel.deleteOne({_id: id}).then((data) => {
    //提醒
    res.json({
        code:"0000",
        msg:"删除成功~~",
        data: data
    })
  }).catch((err)=>{
    res.json({
    code:'1003',
    msg:'删除失败~~',
    data:null
    })
  });
});

//获取单个信息
router.get('/account/:id',checkTokenMiddleWare, (req, res)=>{
    console.log("测试将token数据存储在请求头 "+ req.user.username)
    // console.log(req.params);
    let {id} = req.params;
    AccountModel.findById(id).then((data)=>{
        res.json({
            code: "0000",
            msg: '查找成功~~',
            data: data
        });
    }).catch((err)=>{
        res.json({
            code:'1004',
            msg:'查找失败~~',
            data:null
        })
    })
})

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleWare, (req,res)=>{
    let {id} = req.params;
    AccountModel.updateOne({_id:id},req.body).then(()=>{
        AccountModel.findById(id).then((data)=>{
            res.json({
                code: '0000',
                msg: '更新成功~~',
                data: data
            });
        }).catch((err)=>{
            res.json({
                code:'1005',
                msg:'更新失败~~',
                data:null
            });
        })
    }).catch((err)=>{
        res.json({
            code:'1005',
            msg:'更新失败~~',
            data:null
        })
    })
})
module.exports = router;