const db = require('../util/database');
const { validationResult } = require('express-validator');
const moment = require('moment');

exports.register = (req, res) => {
    const { username, firstname, lastname, email, dob, contact, address, password, confirmPassword } = req.body;
    console.log(username, firstname, lastname, email, dob, contact, address, password, confirmPassword);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({ status: false, errorMessage: errors.array() });
    }

    let now = new Date();
    now = moment().format('YYYY-MM-DD hh:mm:ss');
    let dateofbirth = new Date(dob.replace('/', '-'));
    dateofbirth = formatDate(dateofbirth);


    db.execute(`INSERT INTO users (username, firstname, lastname, email, dateofbirth, contact, address, password, datecreated) 
                VALUES ('${username}', '${firstname}', '${lastname}', '${email}', '${dateofbirth}', '${contact}', '${address}', '${password}','${now}')`
    )
        .then((result) => {
            console.log(result[0].insertId);
            return res.json({ status: true, message: "User Registered successfully!!" });
        })
        .catch((err) => {
            return res.json({ status: false, errorMessage: "Some error occured while registering!!" })
        });

    // return res.json(req.body);
}

function formatDate(date1) {
    return date1.getFullYear() + '-' +
        (date1.getMonth() < 9 ? '0' : '') + (date1.getMonth() + 1) + '-' +
        (date1.getDate() < 10 ? '0' : '') + date1.getDate();
}