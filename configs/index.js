import app from './app.js'
import db from './db.js'
import token from './token.js'

export const config = {
    ...db,
    ...app,
    ...token,
}
