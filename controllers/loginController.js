const Usermodel = require('../models/Usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Usermodel.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        };

        //pwd compare
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
        res.status(200).json({
            success: true,
            message: 'Login successfull',
            token: token,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
module.exports = { login };