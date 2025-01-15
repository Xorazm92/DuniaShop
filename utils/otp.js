import { generate } from 'otp-generator'

export const otpGenerator = generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
})
