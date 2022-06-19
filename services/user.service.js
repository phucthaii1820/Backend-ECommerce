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
            const user = await User.create({ phone, password: await argon2.hash(password)});
            return user;
        }
        return null;
    },

    //kiểm tra đăng nhập
    async authenticate(phone, password) {
        const user = await User.findOne({phone}, 'name phone password avatar role banned').exec();
        if(await argon2.verify(user.password, password)) {
            return user;
        }
        return null;
    },

    //Tìm user
    async findUserByID(_id) {
        const user_data = await User.findById(_id, "_id name phone avatar role banned").lean().exec()
        if(user_data) 
            return user_data;
        return null;
    },

    async findUserByPhone(phone) {
        const user_data = await User.findOne({phone},  'name phone avatar role banned').exec();
        if(user_data) 
            return user_data;
        return null;
    },

    async getAllUser() {
        return await User.find('-password').exec()
    }
}