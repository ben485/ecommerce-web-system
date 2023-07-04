const pool = require('../config/database')

async function CheckIfUserExist(inputEmail){
    try {
      const sql = `SELECT inputEmail FROM users WHERE inputEmail = ?`
       const [results] = await pool.query(sql, [inputEmail])
        if(results === 0){
            results = []
          return  results
        } 
        return results
    } catch (error) {
       console.log(error)
    }
  }


  async function UpdatePasswod(inputEmail, newpassword){
    try {
      const sql = `UPDATE users SET password = '${newpassword}' WHERE inputEmail = ?`
       const [results] = await pool.query(sql, [inputEmail])
        return results
    } catch (error) {
       console.log(error)
    }
  }




  module.exports = {
     CheckIfUserExist,
     UpdatePasswod
  }