import userService from '../../../controllers/admin/user'

export default {
    async getAllUser(req, res) {
        const users = await userService.getAllUser();
        res.send(
            users
        )
    }
}