import jwt from 'jsonwebtoken'

import { config } from '../configs/index.js'

export const createAcessAndRefresh = (user) => {
    const access_token = jwt.sign(user, config.token.access.secret, {
        expiresIn: config.token.access.exprisIn,
    })
    const refresh_token = jwt.sign(user, config.token.refresh.secret, {
        expiresIn: config.token.refresh.exprisIn,
    })
    return {
        access_token,
        refresh_token,
    }
}

export const forgetPasswordToken = (user) => {
    const forget_token = jwt.sign(user, config.token.forget.secret, {
        expiresIn: config.token.forget.exprisIn,
    })
    return forget_token
}

export const verifyToken = (token, secret) => {
    const verified = jwt.verify(token, secret)
    return verified
}
