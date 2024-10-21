const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to authenticate JWT
const authenticate = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token;  

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user information to req.user
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticate };
