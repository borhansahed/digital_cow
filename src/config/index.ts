const config = {
  node_env: process.env.NODE_ENV,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_url: process.env.DB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
}

export default config
