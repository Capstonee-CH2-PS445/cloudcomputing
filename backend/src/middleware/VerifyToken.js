import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    req.user = null;
    return next();
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err) return res.sendStatus(403);
      req.email = decoded.email;
      next();
    }

    req.user = {
      userId: decoded.userId,
      name: decoded.name,
      email: decoded.email
    };

    next();
  });
};


import bodyParser from 'body-parser';

// Middleware untuk menghandle formulir URL-encoded
export const urlencodedMiddleware = bodyParser.urlencoded({ extended: true });

