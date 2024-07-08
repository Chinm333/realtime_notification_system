const User = require('../models/UserSchema');

const getUser = async(filter)=>{
    const user = await User.find(filter);
    return user;
};

const updateUser = async(userId,payload)=>{
    const user = await User.findOneAndUpdate(userId,payload, { new: true });
    return user;
};

const deleteUser = async(userId)=>{
    const user = await User.findOneAndDelete(userId);
    return 'User deleted sucessful';
};

module.exports = { 
    getUser, 
    updateUser, 
    deleteUser 
};