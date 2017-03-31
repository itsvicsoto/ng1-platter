module.exports = function (User) {

  console.log('User : ', User);

  User.create({email: 'foo@bar.com', password: 'bar'}, function(err, user) {
    console.log(user);
  });


};
