import userService from '../../services/user.service.js'

export default {
    async info (req, res) {
        if(req.user_data) {
            const phone = req.user_data.phone
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
        else 
            res.status(400).json({success: false, message: 'Please login your account!'});
    }   
}
