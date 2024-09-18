// const jwt=require('jsonwebtoken');
// const { errorHandler } = require('./error');

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (!token) return next(errorHandler(401, 'Unauthorized'));

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(errorHandler(403, 'Forbidden'));

//     req.user = user;
//     next();
//   });
// };

// module.exports={verifyToken}

const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error');

const verifyToken = (req, res, next) => {
  
  // Check Authorization header or cookies for token
  const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};

module.exports = { verifyToken };