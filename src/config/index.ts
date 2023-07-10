import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

const config = {
  node_env: process.env.NODE_ENV,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_url: process.env.DB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    access_token: process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRES,
    access_token_expires: process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRES,
    refresh_token: process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRES,
    refresh_token_expires: process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRES,
  },
}

export default config
