
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '217.21.91.103',
    user: 'u621469844_pprvsnrdkd',
    password: 'SSF@best1',
    database: 'u621469844_ssfdbpprvs',
  connectionLimit: 10 
});

export const QueryDB = async (sql) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(sql);
   
    connection.release();
    return {
      success: true,
      data: rows,
      error: null
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: [],
      error: error
    };
  }
};
