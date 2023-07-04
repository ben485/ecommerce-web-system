const db_connection = require('../config/database');

async function fetchItemsFromDB(sql, values){
    try {
         let [results] = await db_connection.query(sql, values);
         return results
    } catch (error) {
        console.log(error)
    }
}

async function insertIntoDB(sql, Data){
    try {
          await db_connection.query(sql, Data)
    } catch (error) {
        console.log(error)
    }
}


async function findSumOfItemsInDB(sql, values){
    try {
         let [results] = await db_connection.query(sql, values);
         if(results.length === 0){
            return {Total:0}
         }else{
            if(results[0].Total === null){
                return {Total:0}
            }else{
                return results[0]
            }
         }
    } catch (error) {
        console.log(error)
    }
}


async function upDateItemsinDB(sql, values){
    try {
          await db_connection.query(sql, values);
          return null
    } catch (error) {
        console.log(error) 
    }
}

async function deleteItemFromDB(sql ,values){
    try {
          await db_connection.query(sql, values)
          return null
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    fetchItemsFromDB,
    insertIntoDB,
    findSumOfItemsInDB,
    upDateItemsinDB,
    deleteItemFromDB
}