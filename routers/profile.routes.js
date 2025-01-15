import { Router } from 'express'
import { profilesController } from '../controllers/index.js'
import { checkValidatons, authGuard, roleGuard } from '../middlewares/index.js'
import { profileSchema } from '../validations/index.js'
import { config } from '../configs/index.js'

export const profileRouter = Router()
const secret = config.token.access.secret

profileRouter.get('/', profilesController.getAll)
profileRouter.get('/:id', profilesController.getById)
profileRouter.get(
    '/user/:user_id',
    authGuard(secret),
    roleGuard(['user', 'admin', 'manager']),
    profilesController.getByUserId,
)
profileRouter.post(
    '/',
    authGuard(secret),
    roleGuard(['user', 'admin', 'manager']),
    checkValidatons(profileSchema),
    profilesController.create,
)
profileRouter.put('/:id', profilesController.update)
profileRouter.delete(
    '/:id',
    authGuard(secret),
    roleGuard(['admin', 'manager']),
    profilesController.delete,
)
