/**
 * 
 * @param {*} success 数据库连接成功的回调函数
 * @param {*} error 数据库连接失败的回调函数
 */


module.exports = function(success, error){
    if(typeof error!=='function'){
        error = ()=>{
            console.log('连接失败~~~~');
        }
    }
    // console.log(success)
    const {DBHOST, DBPORT, DBNAME} = require('../config/config.js')
    // 1、导入mongoose包
    const mongoose = new require('mongoose');
    // 2、连接数据库
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    // 3、回调
    // once 执行一次 场景：在服务器掉，重新连接服务器时once内部函数不再执行，而on会重复执行
    mongoose.connection.once("open", ()=>{
        success();
    });
    mongoose.connection.on("error", ()=>{
        error();
    });
    mongoose.connection.on("close", ()=>{
        console.log('连接关闭~~');
    });
}
