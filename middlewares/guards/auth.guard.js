import { verifyToken } from '../../utils/index.js'
import { logger } from '../../utils/index.js'

export const authGuard = (secret) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({
                    success: false,
                    message: 'Authorization header missing or malformed',
                })
            }

            const token = authHeader.split(' ')[1]
            //chaqirgan joyingizdan secret ni berasizlar secret config da
            const decode = verifyToken(token, secret)
            if (!decode) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid or expired token',
                })
            }

            req.user = decode
            next()
        } catch (error) {
            logger.error('AuthGuard error:', error.message || error)
            next(error)
        }
    }
}
