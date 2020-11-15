import dotenv from 'dotenv'
import assert from 'assert'

export interface Config {
  JWT_SECRET: string
}

const env = dotenv.config()
if (env.error) {
  console.error('Loading environment failed', env.error)
  process.exit(1)
}

export const config: Config = {
  JWT_SECRET: process.env.JWT_SECRET
}

assert.ok(config.JWT_SECRET, 'JWT_SECRET')
