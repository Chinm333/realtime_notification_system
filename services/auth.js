const User = require('../models/UserSchema');
const config = require('../config/config');
const bcrypt = require("bcrypt");
const { generateRandomString } = require('../services/common');
const jwt = require('../utils/jwt');

const register = async (username, email, password) => {
    const userId = generateRandomString(4);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        userId,
        username,
        email,
        password: hashedPassword
    });
    return user;
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }
    const jwtToken = jwt.generateToken(user.id);
    return { user, jwtToken };
};

module.exports = {
    register,
    login
};