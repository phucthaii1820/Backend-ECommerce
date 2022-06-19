import userService from '../services/user.service.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

export default {
    async authMiddleware (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        let decodedData = {};

        
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (!err && decoded) {
                    decodedData = decoded;
                }
            });
        }

    
        if(decodedData?.user_data?._id) {
            const user_data = await userService.findUserByID(decodedData.user_data._id);

            req.user_data = user_data;
        }

        next();
    }
}