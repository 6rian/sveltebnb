import { Sequelize } from 'sequelize'

export const user = 'bgriffin'
export const password = ''
export const host = 'localhost'
export const database = 'sveltebnb'

export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  logging: false
})
