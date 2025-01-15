export const roleGuard = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.role
            if (allowedRoles.includes(userRole)) {
                next()
            } else {
                return res.status(403).send({
                    message: 'Access denied: insufficient permissions',
                    date: userRole,
                })
            }
        } catch (e) {
            logger.error(e)
            next(e)
        }
    }
}
