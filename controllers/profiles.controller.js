import { profilesService } from '../services/index.js'

export const profilesController = {
    getAll: async (req, res, next) => {
        try {
            const profiles = await profilesService.getAll()
            return res.status(200).send({
                status: 'Success',
                profiles,
            })
        } catch (error) {
            next(error)
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params
            const profile = await profilesService.getById(id)
            return res.status(200).send({
                status: 'Success',
                profile,
            })
        } catch (error) {
            next(error)
        }
    },

    getByUserId: async (req, res, next) => {
        try {
            const { user_id } = req.params
            const profiles = await profilesService.getByUserId(user_id)
            return res.status(200).send({
                status: 'Success',
                profiles,
            })
        } catch (error) {
            next(error)
        }
    },

    create: async (req, res, next) => {
        try {
            const profileData = req.body
            const newProfile = await profilesService.create(profileData)
            return res.status(201).send({
                status: 'Created',
                newProfile,
            })
        } catch (error) {
            next(error)
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params
            const updateData = req.body
            const updatedProfile = await profilesService.update(id, updateData)
            return res.status(200).send({
                status: 'Updated',
                updatedProfile,
            })
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params
            const deletedProfile = await profilesService.delete(id)
            return res.status(200).send({
                status: 'Deleted',
                message: 'Profile deleted successfully',
                deletedProfile,
            })
        } catch (error) {
            next(error)
        }
    },
}
