import bcrypt from 'bcrypt'

export const createBcrypt = async (userPassword) => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(userPassword, salt)
    return hashPassword
}

export const comparePassword = async (password, hashPassword) => {
    const result = await bcrypt.compare(password, hashPassword)
    return result
}
