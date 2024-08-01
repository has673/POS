const { createUser } = require("../services/adminservices");



const addUser = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        const newUser = await createUser({ email, password, username });
        console.log(newUser);
        return res.status(200).json({ message: 'User Added' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    addUser
};
