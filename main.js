var express=require('express')
var bodyparser=require('body-parser')
var app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

<<<<<<< HEAD
=======
app.use(bodyparser.json())

>>>>>>> e7f42a7eff4c8e88b5207d9b3a27471d71b9c50c
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use('/raise-request',require('./models/user'));

app.listen(8888,'localhost',function(){
    console.log('Server Running');
})


