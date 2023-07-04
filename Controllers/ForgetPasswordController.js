const bcrypt = require('bcryptjs');
const {CheckIfUserExist, UpdatePasswod} = require('../Models/ForgetPassword')


const ForgetPassWord = async(req, res) => {
    let Email = (req.body.email).trim()
    const results =  await CheckIfUserExist(Email)
    console.log(results)
    res.json({results:results})
}

const ForgetPassWordPage = (req, res) => {
    let Title = 'Procoding Bootcamp - Payment Page'
    res.render('forgetpassword', {Title:Title})
}

const UpdatePassword = async (req, res) => {
    try {
        let inputEmail = (req.body.email).trim()
        let password = (req.body.Newpassword).trim()

        let salt = bcrypt.genSaltSync(10)
        let newpassword = bcrypt.hashSync(password, salt)
        console.log(newpassword)

        await UpdatePasswod(inputEmail, newpassword)
        res.json({Mes: 'Password Changed'})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    ForgetPassWord,
    ForgetPassWordPage, 
    UpdatePassword
}