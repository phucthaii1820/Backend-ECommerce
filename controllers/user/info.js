import userService from '../../services/user.service.js'

export default {
    async info (req, res) {
        const username = req.body.username
        const user_data = await userService.findUserByUsername(username);

        if(user_data) {
            res.send(
                {
                    user_data
                })
        }
        else {
            res.status(400).json({success: false, message: 'Username already exists'});
        }
    }   
}
