module.exports = function (Email) {

    // send an email
    Email.sendEmail = function (data, cb) {
        Email.app.models.Email.send({
            to: data.to,
            from: data.from,
            subject: data.subject,
            text: data.text,
            html : data.html
        }, function (err, mail) {
            console.log('email sent!');
            cb(err);
        });
    }

};
