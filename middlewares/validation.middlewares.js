export const checkValidatons = (validation) => {
    return (req, res, next) => {
        try {
            const body = req.body
            validation.parse(body)
            next()
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: 'Validation Error',
                errors: error.errors.map((err) => ({
                    path: err.path,
                    message: err.message,
                })),
            })
        }
    }
}
