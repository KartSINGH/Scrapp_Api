var sequelize = require('sequelize'),
seq=new sequelize('scrapp','root','scrappfree',{
    host:'ec2-35-154-195-217.ap-south-1.compute.amazonaws.com',
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