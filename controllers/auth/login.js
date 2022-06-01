import userService from '../../services/user.service.js'
import jwt from 'jsonwebtoken'

export default {
    async login (req, res) {
        let account;
        if(!req.body.username || !req.body.password)
            res.status(400).json({success: false, message: "Don't have username or password!"});
        else {
            account = await userService.authenticate(req.body.username, req.body.password);

            if(account) {
                res.send(
                    {
                        user_data: {
                            _id: account._id,
                            name: account.name,
                            username: account.username,
                            avata: account.avata,
                            role: account.role
                        },
                        token: jwt.sign({account}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2 days'})
                    })
            }
            else
                res.status(400).json({success: false, message: 'Wrong username or password!'});
        }
        
    }
}
