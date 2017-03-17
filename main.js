var express=require('express')
var bodyparser=require('body-parser')
var app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use('/raise-request',require('./models/user'));

app.listen(8888,'localhost',function(){
    console.log('Server Running');
})


