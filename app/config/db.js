const {Pool} = require('pg');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') }); // 


console.log(process.env.DATABASE_URL);

const connectionPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
})

connectionPool.connect().then(()=>{
    console.log("Connection estblished with neon db")
}).catch(err=> console.error("Connection Failed", err.message)
)


// fun to test if connection is established or not.
async function testConnection() {
  try {
    const res = await connectionPool.query('SELECT NOW()');
    console.log('Connected to DB:', res.rows[0]);
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}

// testConnection();

module.exports = {connectionPool,testConnection};
