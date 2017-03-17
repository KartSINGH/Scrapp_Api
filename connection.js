var sequelize = require('sequelize'),
seq=new sequelize('scrapp','35.154.195.217','scrappfree',{
    host:'35.154.195.217',
    dialect:'mysql',
    pool:{
        max:15,
        min:0,
        idle:2000
    }
})
module.exports={
    sequelize:sequelize,
    seq:seq
}