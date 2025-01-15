import db from '../database/index.js'
import { AppError } from '../utils/index.js'

export const profilesService = {
    getAll: async () => {
        try {
            const profiles = await db('profiles').select('*')
            return profiles
        } catch (error) {
            throw new AppError('Error fetching profiles', 500)
        }
    },

    getById: async (id) => {
        try {
            const profile = await db('profiles')
                .select('*')
                .where({ id })
                .first()
            if (!profile) throw new AppError('Profile not found', 404)
            return profile
        } catch (error) {
            throw new AppError('Error fetching profile', 500)
        }
    },

    getByUserId: async (userId) => {
        try {
            const profiles = await db('profiles')
                .select('*')
                .where({ user_id: userId })
            if (!profiles.length)
                throw new AppError('No profiles found for this user', 404)
            return profiles
        } catch (error) {
            throw new AppError('Error fetching profiles for user', 500)
        }
    },

    create: async (profileData) => {
        try {
            const [newProfile] = await db('profiles')
                .insert(profileData)
                .returning('*')
            return newProfile
        } catch (error) {
            throw new AppError('Error creating profile', 500)
        }
    },

    update: async (id, updateData) => {
        try {
            const [updatedProfile] = await db('profiles')
                .where({ id })
                .update(updateData)
                .returning('*')
            if (!updatedProfile)
                throw new AppError('Profile not found to update', 404)

            return updatedProfile
        } catch (error) {
            throw new AppError('Error updating profile', 500)
        }
    },

    delete: async (id) => {
        try {
            const deletedProfile = await db('profiles')
                .where({ id })
                .del()
                .returning('*')

            if (!deletedProfile.length)
                throw new AppError('Profile not found to delete', 404)

            return deletedProfile[0]
        } catch (error) {
            throw new AppError('Error deleting profile', 500)
        }
    },
}
