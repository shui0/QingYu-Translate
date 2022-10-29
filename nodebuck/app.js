//导入express模块
const express = require('express')
// 导入 cors 中间件
const cors = require('cors')
//引入路由
const buck_data_router = require('./router/inforouter')
const img_data_router = require('./router/img')
// 导入@hapi/joi
const joi = require('joi')

//创建express的服务器实例
const app = express()
app.use(express.static('./static'))
// 重新封装的res.send()
app.use(function (req, res, next) {
    // status=0为成功 status=1为失败，默认为1
    res.cc = function (err, status = 1) {
        res.send({
            //    状态
            status,
            // 状态描述，判断err是错误对象还是字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// cors跨越
app.use(cors())
// ，配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 注册登录路由模块
app.use('/api/buck', buck_data_router)
app.use('/api/img', img_data_router)


app.listen(8080,()=>{
    console.log('api serve running 8080')
})