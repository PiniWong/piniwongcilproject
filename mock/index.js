const fs = require('fs')
const path = require('path')
const Mock = require('mockjs')
const JSON5 = require('json5')



//读取json文件
function getJsonFile(filepath){
    var json = fs.readFileSync(path.resolve(__dirname,filepath),'utf-8')
    return JSON5.parse(json)
}


//返回一个函数
module.exports = function(app){
    app.get('/user/userInfo',function(req,res){
        //每次响应时读取mock data的json文件
        //getJsonFile方法定义了如何读取json文件解析成数据对象
        let json = getJsonFile('./userInfo.json5')
        //将json传入Mock.mock方法中，生成数据返回给浏览器
        res.json(Mock.mock(json))
    })
    app.post('/login/go',function(req,res,options){
        var dataname =options.name
        if(dataname){
            let json = getJsonFile('./loginToken.json5')
            res.json(Mock.mock(json))
        }else{
            res.json(Mock.mock({
                status:400,
                title:'传参失败'
            }))
        }
    })
    app.get('/role/roleInfo',function(req,res){
        let json = getJsonFile('./roleInfo.json5')
        res.json(Mock.mock(json))
    })
}