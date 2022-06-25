import userService from '../../services/user.service.js'

export default {
    async info (req, res) {
        const phone = req.body.phone
        const user_data = await userService.findUserByPhone(phone);

        if(user_data) {
            res.send(
                {
                    user_data
                })
        }
        else {
            res.status(400).json({success: false, message: 'User is not already exists'});
        }
    }   
}
