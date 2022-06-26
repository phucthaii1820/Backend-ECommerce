import User from '../models/User.model.js'
import argon2 from 'argon2'


export default{

    //kiểm tra user tồn tại
    async checkExitsUser(phone) {
        const user = await User.exists({phone});
        return user;
    },

    //tạo mới user
    async createNewUser(phone, password) {
        if(!await User.exists({phone})){
            const hashPass = await argon2.hash(password)
            const user = await User.create({ phone, password: hashPass});
            return user;
        }
        return null;
    },

    //kiểm tra đăng nhập
    async authenticate(phone, password) {
        const user = await User.findOne({phone}, 'name phone password avatar role banned').exec();
        if(user) {
            if(await argon2.verify(user.password, password)) {
                return await User.findOne({phone}, '-password').exec();
            }
        }
        return null;
    },

    //Tìm user
    async findUserByID(_id) {
        const user_data = await User.findById(_id, "-password").lean().exec()
        if(user_data) 
            return user_data;
        return null;
    },

    //Tìm user bằng số điện thoại
    async findUserByPhone(phone) {
        const user_data = await User.findOne({phone},  '-password').exec();
        if(user_data) 
            return user_data;
        return null;
    },

    //Lấy tất cả user
    async getAllUser() {
        return await User.find('-password').exec()
    },

    //cập nhật lại thông tin người dùng
    async updateInfo(phone, email, fullname, gender, address, cmnd, bio) {
        return User.updateOne({ phone }, {
            email, fullname, gender, address, cmnd, bio
        })
    },

    //Cập nhật lại password
    async updatePassword(phone, password, newPassword) {
        const user = this.authenticate(phone, password);
        if(user) {
            return User.updateOne({ phone }, {
                password: await argon2.hash(newPassword)
            })
        }
        else
            return null
    }
}