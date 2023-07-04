const pool = require('../config/database');

async function LoginEmailCheck(email) {
    //console.log('nbbtttt')
    const sql = 'SELECT * FROM users WHERE inputEmail = ?';
    try {
        let [results] = await pool.query(sql, [email])
        return { status: 'success', results:results }
    } catch (error) {
        console.log(error)
        return { status: 'failure', message: error };

    }
}


async function LoginIndexCheck(index) {
  try {
    const sql = `SELECT * FROM users WHERE indexNumber = ?`
    let [results] = await pool.query(sql, [index])
     if(results.length === 0){
        return {status: 'No-User', }
     }else{
        return {user:results[0]  }
     }
    
  } catch (error) {
    console.log(error)
    return { status: 'failure', message: err.message };
  }

}





module.exports = {
    LoginEmailCheck,
    LoginIndexCheck
}
