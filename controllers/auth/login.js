import userService from '../../services/user.service.js'
import jwt from 'jsonwebtoken'

export default {
    async login (req, res) {
        let user_data;
        if(!req.body.username || !req.body.password)
            res.status(400).json({success: false, message: "Don't have username or password!"});
        else {
            user_data = await userService.authenticate(req.body.username, req.body.password);
            delete user_data.password
            if(user_data) {
                res.send(
                    {
                        user_data,
                        token: jwt.sign({user_data}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2 days'})
                    })
            }
            else
                res.status(400).json({success: false, message: 'Wrong username or password!'});
        }
        
    }
}
