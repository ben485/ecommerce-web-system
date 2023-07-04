const bcrypt = require('bcryptjs');
const { checkForEmail, indexNumberCheck, saveRegistrationData } = require('../Models/RegisterModel');


const Registration = async (req, res) => {
  try {
    const errors = [];

    // Generate and format today's date
    const today = new Date();
    const stringDate = today.toLocaleDateString();
    const wordDate = today.toDateString();
    const year = today.getFullYear();

 
  
    // Validate password length and match
    if (req.body.password.length < 7) {
     
      errors.push({ msg: 'Passwords should be at least 7 characters long!' });
    } else if (req.body.password !== req.body.Confirmpassword) {
      errors.push({ msg: 'Passwords do not match' });
    }

    // Check for any errors generated
    if (errors.length > 0) {
      console.log(errors)
      return res.render('register', { errors, Title: 'Procoding Bootcamp - New Registration' });
    }

    // Check if email already exists
    const mailCheck = await checkForEmail(req.body.Email);
    //console.log(mailCheck)
    if (mailCheck.results.length > 0) {
      errors.push({ msg: 'Email address already exists' });
      return res.render('register', { errors ,Title: 'MFGC Shipping Services'});
    }

    const salt = bcrypt.genSaltSync(10);

    // Create user information
    const userData = {
      Name:req.body.Name,
      inputEmail: req.body.Email,
      wordDate:wordDate,
      password: bcrypt.hashSync(req.body.password, salt),
    };

    // Save user data to database
    await saveRegistrationData(userData);
     //console.log(56)
    req.flash('success_msg', 'You are now registered and you can log in');
    return res.redirect(`/login`);
  } catch (error) {
    console.log(error);
    const errors = [{ msg: 'Error occurred while processing request' }];
    return res.render('register', { errors, Title: 'Procoding Bootcamp - New Registration'});
  }
}



let GenerateIndex = () =>{
  const min = 1000000000;
  const max = 9999999999;
 return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports ={
    Registration
}

