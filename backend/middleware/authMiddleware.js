const secret = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}

export const authorize = (...role) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!userRole || !role.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    }
}