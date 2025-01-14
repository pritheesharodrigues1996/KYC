const authService = require('../../../services/auth.service');
const userService = require('../../../services/user.service');
const bcrypt = require('bcryptjs')
const jwtSecretKey = require('../../../config/key')
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phoneNumber } = req.body;
        const existingUser = await userService.findUser(email);
        if (existingUser) return res.status(409).json({ message: 'Email already in use' });
        const user = await authService.registerUser({ email, password, firstName, lastName, phoneNumber });
        res.status(201).json({
            message: 'User registration Successfull',
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredentials = await userService.findUser(email);
        if (!userCredentials) {
            return res.status(401).json({ message: 'User Not Found' });
        }
        const isMatch = await bcrypt.compare(password, userCredentials.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }
        const token = jwt.sign({ userId: userCredentials._id, role: userCredentials.role }, jwtSecretKey, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login successful',
            user: { email: userCredentials.email, firstName: userCredentials.firstName, lastName: userCredentials.lastName, role: userCredentials.role },
            token: token
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

