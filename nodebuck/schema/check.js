// 导入joi模块，定义效验规则
const joi = require('joi')

const imgNameCheck = joi.string().required()//图片文件名



exports.sentimgName = {
    body:{
        imgNameCheck,
    }
}
