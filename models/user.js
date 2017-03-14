
var router = require('express').Router(),
    connection = require('../connection'),
    nodemailer = require('nodemailer'),
    sequelize = connection.sequelize,

    temp_user = connection.seq.define('temp_user', {
        user_id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        phone_number: {
            type: sequelize.STRING,
            allowNull: false,
        },
        user_email: {
            type: sequelize.STRING,
            allowNull: false,
        },
        user_name: {
            type: sequelize.STRING,
            allowNull: false
        },
        res_address: {
            type: sequelize.STRING(1234),
            allowNull: false
        },
        scrap_amount: {
            type: sequelize.STRING,
            allowNull: false
        },
        time: {
            type: sequelize.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: true
    })
temp_user.sync()

router.get('/temp/all_users', (request, response) => {
    temp_user.findAll({
        attributes: ['user_id', 'phone_number', 'user_email','user_name','user_res_address','scrap_amount','time']
    }).then((temp_user) => {
        response.send(temp_user);
    })
})

router.get('/temp/check_user/', (request, response) => {
    temp_user.findAll({
        where: {
            user_email: request.query.user_email
        }
    }).then((temp_user) => {
        console.log(temp_user);
        response.send(temp_user);

    })
})

router.post('/submit-request', (request, response) => {
    data_body = request.body;
    temp_user.create({
        user_id: data_body.user_id,
        phone_number: data_body.phone_number,
        user_email: data_body.user_email,
        user_name: data_body.user_name,
        res_address: data_body.res_address,
        scrap_amount: data_body.scrap_amount,
        time:data_body.time
    }).then(function (user_name) {
        var name=user_name;
        var transporter = nodemailer.createTransport({
          service:"Godaddy",
            auth:{
                user:'info@scrapp.in',
                pass:'Rohan#123'
            },
            secure : true,
            
        });
        var text="Greetings "+name.user_name+" from ScrApp team!.We thank you for choosing us.Our call support will get in touch with you on the registered mobile number and initiate further process.";
        var mailOptions={
            to:name.user_email,
            from:'info@scrapp.in',
            subject:'ScrApp || Srcap Pickup Response',
            text:text
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                response.send(error)
            }else{
                response.send('email sent');
            }
        });
        response.send({
            status:0,
            message:"Email sent"

        })
    }).catch(function (error) {
        response.send(error);
        response.send({
            status: 1,
            message: 'error'
        })
    })
})
module.exports = router