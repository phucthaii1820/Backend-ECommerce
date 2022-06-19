import userService from '../../services/user.service.js'
import jwt from 'jsonwebtoken'

export default {
    async login (req, res) {
        let user_data;
        if(!req.body.phone || !req.body.password)
            res.status(400).json({success: false, message: "Don't have phone or password!"});
        else {
            user_data = await userService.authenticate(req.body.phone, req.body.password);
            delete user_data.password
            if(user_data) {
                res.send(
                    {
                        user_data: {
                            _id: user_data._id,
                            name: user_data.name,
                            phone: user_data.phone,
                            avata: user_data.avata,
                            role: user_data.role
                        },
                        token: jwt.sign({user_data}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2 days'})
                    })
            }
            else
                res.status(400).json({success: false, message: 'Wrong phone or password!'});
        }
        
    }
}
