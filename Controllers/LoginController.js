const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {LoginEmailCheck, LoginIndexCheck} = require('../Models/LoginModels')


async function newLogin(req, res, next) {
    try {
        passport.use(
        new LocalStrategy({ usernameField: 'Email', passwordField:'password' }, async(Email, password, done) => { 
         let emailCheck = await LoginEmailCheck(Email);
        // console.log(emailCheck)
         if(emailCheck.results.length === 0){
           return done(null, false, { message: 'Email does not exist' })
         }


         let user = emailCheck.results[0]
         //console.log(user)

         bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                return done(null, user);
            } else {
               //console.log('User password incorrect')
                return done(null, false, { message: 'Password incorrect' });
            }

        })

        })
        )

        passport.serializeUser(function(user, cb) {
            process.nextTick(function() {
              return cb(null, {
                inputEmail: user.inputEmail,
                Name: user.Name,
                wordDate: user.wordDate
           

    
              });
            });
          });
          
    
          passport.deserializeUser(function(user, cb) {
            process.nextTick(function() {
              return cb(null, user);
            });
          });
    
    
        passport.authenticate('local', {
            successRedirect: `/dashboard`,
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    
    
    } catch (error) {
        console.error(error);
    }
}


const Logout = (req, res) => {
  req.logout();
  res.redirect('/login');
}
module.exports = {
    newLogin,
    Logout
}


