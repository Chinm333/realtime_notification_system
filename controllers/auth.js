const authService = require('../services/auth');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await authService.register(username, email, password);
        return res.status(201).json({
            status: 201,
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'User creation unsuccessful' + error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, jwtToken } = await authService.login(email, password);
        return res.status(200).json({
            status: 200,
            message: 'User login successful',
            data: user,
            token: jwtToken
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'User login unsuccessful' + error.message
        });
    }
};

const logout = async (req, res) => {
    res.status(200).end();
};

module.exports = {
    register,
    login,
    logout
};