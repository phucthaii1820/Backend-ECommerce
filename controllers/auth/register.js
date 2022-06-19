import userService from '../../services/user.service.js'
import jwt from 'jsonwebtoken'

export default {
    async register (req, res) {
        console.log(req.body)

        if(!await userService.checkExitsUser(req.body.phone)) {
            const account = await userService.createNewUser(req.body.phone, req.body.password);
            
            if(account) {
                res.send(
                    {
                        user_data: {
                            _id: account._id,
                            name: account.name,
                            phone: account.phone,
                            avata: account.avata,
                            role: account.role
                        },
                        token: jwt.sign({account}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2 days'})
                    })
                }
        }
        else {
            res.status(400).json({success: false, message: 'User already exists'});
        }
    }
}
