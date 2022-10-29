const fs = require('fs')
const path=require('path');
//上传图片的模板
var multer=require('multer');
//生成的图片放入uploads文件夹下
var upload=multer({dest:'uploads/'})
// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
//导入邮箱规则对象
const {sentimgName} = require('../schema/check')
// 引入express
const express = require('express')

var imgName = ''
//创建路由实例
const router = express.Router()

//图片上传必须用post方法
router.post('/imgs',upload.single('test'),(req,res)=>{
    //读取路径（req.file.path）
        fs.readFile(req.file.path,(err,data)=>{
        //读取失败，说明没有上传成功
            if(err){return res.send('上传失败')}  
         //否则读取成功，开始写入
         //我们先尝试用原文件名originalname写入吧
         // 三个参数
         //1.图片的绝对路径
         //2.写入的内容
         //3.回调函数  
        let time=Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
        //拓展名
        let extname=req.file.mimetype.split('/')[1]
        //拼接成图片名
        let keepname=time+'.'+extname
        let oriName = req.file.originalname
          fs.writeFile(path.join(__dirname,'../static/img/'+req.file.originalname),data,(err)=>{
                if(err){return res.send('写入失败')}
                res.send({err:0,msg:'上传ok',data:`/img/${oriName}`})
            })
        })
    })


// 获取随机图片名
router.post('/imgName', expressJoi(sentimgName),(req,res)=>{
    console.log(req.body.imgNameCheck)
    imgName = req.body.imgNameCheck
    res.send({
        status:0,
        message: 'success',
    })
})

// 发送图片名
router.get('/getimgName', (req,res)=>{
    res.send({
        status:0,
        imgName,
    })
})
//向外共享路由
module.exports = router