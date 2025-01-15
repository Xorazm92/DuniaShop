import {
    AppError,
    comparePassword,
    createAcessAndRefresh,
    createBcrypt,
    forgetPasswordToken,
    logger,
    otpGenerator,
    sendMail,
    verifyToken,
} from '../utils/index.js'
import db from '../database/index.js'
import { config } from '../configs/index.js'

export const getUserService = async (
    type,
    data = '',
    page = '',
    limit = '',
) => {
    try {
        let result
        switch (type) {
            case 'all':
                const offset = page * limit
                result = await db('users')
                    .select(
                        'id',
                        'email',
                        'username',
                        'google_id',
                        'role',
                        'status',
                        'created_at',
                        'updated_at',
                        'last_login',
                    )
                    .limit(limit)
                    .offset(offset)
                break
            case 'id':
                result = await db.select().from('users').where('id', '=', data)
                break
            case 'email':
                result = await db
                    .select()
                    .from('users')
                    .where('email', '=', data)
                break
            case 'username':
                result = await db
                    .select()
                    .from('users')
                    .where('username', '=', data)
                break
            default:
                break
        }
        return result
    } catch (error) {
        logger.error(error.message)
        throw new AppError(error.message, 500)
    }
}

export const createUserService = async (user) => {
    try {
        const currentEmail = await getUserService('email', user.email)
        console.log(currentEmail)

        if (currentEmail.length !== 0) {
            throw new AppError('email already exists', 403)
        }

        const currentUsername = await getUserService('username', user.username)
        if (currentUsername.length !== 0) {
            throw new AppError('username already exists', 403)
        }

        const hashPassowrd = await createBcrypt(user.password)

        user.password = hashPassowrd

        const newUser = await db('users').insert(user).returning('*')

        return newUser
    } catch (error) {
        logger.error(error.message)
        throw new AppError(error, 500)
    }
}

export const updateUserService = async (id, updateUser) => {
    try {
        const currentEmail = await getUserService('email', updateUser.email)
        if (currentEmail.length !== 0) {
            throw new AppError('email already exists', 403)
        }

        const currentUsername = await getUserService(
            'username',
            updateUser.username,
        )
        if (currentUsername.length !== 0) {
            throw new AppError('username already exists', 403)
        }
        const updatedUser = await db('users')
            .where('id', '=', id)
            .update(updateUser)
            .returning('*')
        if (updatedUser.length === 0) {
            throw new AppError('user not found', 404)
        }
        return updatedUser
    } catch (error) {
        logger.error(error.message)
        throw new AppError(error.message, 500)
    }
}

export const daleteUserService = async (id) => {
    try {
        const deleteUser = await db('users')
            .where('id', '=', id)
            .del()
            .returning('*')
        if (deleteUser.length === 0) {
            throw new AppError('user not found', 404)
        }

        return deleteUser
    } catch (error) {
        logger.error(error.message)
        throw new AppError(error.message, 500)
    }
}

//auth
export const authRegisterService = async (user) => {
    return db.transaction(async (trx) => {
        try {
            const dontAllowed = ['admin', 'superAdmin', 'manager']
            if (dontAllowed.includes(user.role)) {
                throw new AppError(
                    'Access denied: insufficient permissions',
                    403,
                )
            }
            const otp = otpGenerator

            const newUser = await createUserService(user)

            const saveOtp = {
                user_id: newUser[0].id,
                code: otp,
            }

            await trx('otps').insert(saveOtp)

            await sendMail(
                newUser[0].email,
                'YOUR OTP',
                `
                otp: ${otp},
                user_id: ${newUser[0].id}
            `,
            )

            return newUser
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    })
}

export const otpService = async (otp) => {
    return db.transaction(async (trx) => {
        try {
            const currentUser = await getUserService('id', otp.user_id)
            if (!currentUser.length) {
                throw new AppError('User not found', 404)
            }

            const currentOtp = await trx
                .select()
                .from('otps')
                .where('user_id', '=', otp.user_id)
            if (!currentOtp.length || currentOtp[0].code !== otp.otp) {
                throw new AppError('OTP code is not true', 400)
            }

            const validity_period =
                new Date() - new Date(currentOtp[0].created_at)
            if (validity_period > 60000) {
                throw new AppError('Expired time!', 400)
            }

            await trx('users')
                .where('id', '=', otp.user_id)
                .update({ status: 'active' })

            await trx('otps').where('user_id', '=', otp.user_id).del()
            return true
        } catch (error) {
            throw new AppError(error.message, 500)
        }
    })
}

export const loginUserService = async (signUser) => {
    try {
        let currentUser

        const currentEmail = await getUserService('email', signUser.login_user)
        const currentUsername = await getUserService(
            'username',
            signUser.login_user,
        )

        if (currentEmail.length === 0 && currentUsername.length === 0) {
            throw new AppError('Incorrect username or passowrd', 401)
        }
        if (currentEmail.length === 0) {
            currentUser = currentUsername
        } else if (currentUsername.length === 0) {
            currentUser = currentEmail
        }

        //check password
        const checkPassowrd = await comparePassword(
            signUser.password,
            currentUser[0].password,
        )
        if (!checkPassowrd)
            throw new AppError('Incorrect username or passowrd', 401)

        if (currentUser[0].status !== 'active') {
            throw new AppError('you are not active!')
        }
        const payload = {
            id: currentUser[0].id,
            email: currentUser[0].email,
            role: currentUser[0].role,
        }

        //update last login
        const loginDate = new Date()
        await db('users')
            .where('id', '=', currentUser[0].id)
            .update({ last_login: loginDate })

        const tokens = await createAcessAndRefresh(payload)
        return tokens
    } catch (error) {
        throw new AppError(error.message, 500)
    }
}

export const forgetPasswordService = async (email) => {
    try {
        const currentUser = await getUserService('email', email)
        if (currentUser.length === 0) {
            throw new AppError('email not found', 404)
        }
        const payload = {
            id: currentUser[0].id,
            email: currentUser[0].email,
        }
        const forget_token = await forgetPasswordToken(payload)
        const now = new Date() // Hozirgi vaqt
        const twoMinuteLater = new Date(now.getTime() + 3 * 60 * 1000)
        await db('password_resets').insert({
            user_id: currentUser[0].id,
            token: forget_token,
            expires_at: twoMinuteLater,
        })
        const resetPasswordApi = `http://localhost:3000/api/v1/auth/reset-password?token=${forget_token}`
        await sendMail(email, 'RESET PASSWORD', resetPasswordApi)
        return true
    } catch (error) {
        throw new AppError(error, 500)
    }
}

export const resetPasswordService = async (token, newPassword) => {
    try {
        const decode = await verifyToken(token, config.token.forget.secret)

        if (!decode) {
            throw new AppError('Invalid or expired token', 401)
        }

        const changeUser = await db('password_resets').where(
            'user_id',
            '=',
            decode.id,
        )
        if (changeUser.length === 0) {
            throw new AppError('user not found', 404)
        }
        const currentDate = new Date()
        if (changeUser.expires_at < currentDate) {
            throw new AppError('token is invalid', 403)
        }

        const hashPassowrd = await createBcrypt(newPassword)

        const updatedPassword = await db('users')
            .where('id', '=', decode.id)
            .update({
                password: hashPassowrd,
            })
            .returning('*')
        return updatedPassword
    } catch (error) {
        throw new AppError(error.message, 500)
    }
}
