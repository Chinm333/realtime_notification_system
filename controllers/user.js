const userService = require('../services/user');

const getUser = async (req, res) => {
    try {
        const filter = {};
        if (req.query.userId) filter.userId = req.query.userId;
        if (req.query.email) filter.email = req.query.email;
        if (req.query.username) filter.username = req.query.username;
        if (req.query.connected !== undefined) {
            filter.connected = req.query.connected === 'true';
        }
        const user = await userService.getUser(filter);
        return res.status(200).json({
            status: 200,
            message: 'User retrieval successful',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'User retrieval unsuccessful' + error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.userId, req.body);
        return res.status(200).json({
            status: 200,
            message: 'User update successful',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'User update unsuccessful' + error.message
        });  
    }
 };

const deleteUser = async (req, res) => { 
    try {
        const user = await userService.deleteUser(req.params.userId);
        return res.status(200).json({
            status: 200,
            message: 'User delete successful',
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'User delete unsuccessful' + error.message
        }); 
    }
};

module.exports = {
    getUser,
    updateUser,
    deleteUser
};