var router = require('express').Router(),
    connection = require('../connection'),
    nodemailer = require('nodemailer'),
    sequelize = connection.sequelize,
    wellknown = require('nodemailer-wellknown'),

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
         user_password: {
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

/*router.get('/temp/all_users', (request, response) => {
    temp_user.findAll({
        attributes: ['user_id', 'phone_number', 'user_email', 'user_name', 'user_res_address', 'scrap_amount', 'time']
    }).then((temp_user) => {
        response.send(temp_user);
    })
})*/

/*router.get('/temp/check_user/', (request, response) => {
    temp_user.findAll({
        where: {
            user_email: request.query.user_email
        }
    }).then((temp_user) => {
        console.log(temp_user);
        response.send(temp_user);

    })
})*/

router.post('/submit-request', (request, response) => {
    data_body = request.body;
    temp_user.create({
        user_id: data_body.user_id,
        phone_number: data_body.phone_number,
        user_email: data_body.user_email,
        user_name: data_body.user_name,
        res_address: data_body.res_address,
        scrap_amount: data_body.scrap_amount,
        user_password: data_body.user_password,
        time: data_body.time
    }).then(function (user_name) {
        var name = user_name;
        
        var transporter = nodemailer.createTransport({
           
            service: 'Gmail',
            auth: {
                user: 'kart.singh15@gmail.com',
                pass: 'dragonballzee'
            },
           

        });

        var text = "Greetings " + name.user_name + " from ScrApp team!.We thank you for choosing us.Our call support will get in touch with you on the registered mobile number and initiate further process.";
        var mailOptions = {
            to: name.user_email,
            from: 'info@scrapp.in',
            subject: 'ScrApp || Srcap Pickup Response',
            text: text
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                response.send(error)
            } else {
                response.send('email sent');
            }
        });


         var text1 = "User Raised Request " + name.user_name;
        var mailOptions1 = {
            to: 'nikhil.singh.moni@gmail.com',
            from: 'kart.singh15@gmail.com',
            subject: 'ScrApp || Srcap Pickup Response to Admin',
            text: text1,
            html: '<h3>Booking ID </h3>'+name.user_id+'<p>User Name</p>'+name.user_name + '<p>User Email</p>'+name.user_email + '<p>User Phone Number</p>'+name.phone_number + '<p>User Address</p>' +name.res_address+ '<p>User Scrap Amount</p>' + name.scrap_amount+ '<p>User Decided Time</p>' +name.time
        }
        transporter.sendMail(mailOptions1, function (error, info) {
            if (error) {
                response.send(error)
            } else {
                response.send('admin email sent');
            }
        });
    })
})
module.exports = router;