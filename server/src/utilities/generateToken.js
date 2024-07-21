import jwt from 'jsonwebtoken';

const generateToken = (user_id, res) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: '15d'
  });
  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // guard against XSS attacks
    sameSite: "strict", // guard against CSRF attacks
    secure: process.env.NODE_ENV !== 'developement'
  })

  return token;
};

export default generateToken;