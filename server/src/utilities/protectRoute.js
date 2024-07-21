import jwt from "jsonwebtoken";
import { getUserById } from "../db/queries/users.queries.js";;

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if(!token) {
      return res.status(401).json({error: "Please login"});
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if(!verifiedToken) {
      return res.status(401).json({error: "Invalid token"});
    }
    const user = await getUserById(verifiedToken.user_id);
    if(!user) {
      return res.status(401).json({error: "User not found"});
    }
    req.body.user_id = user.id;

    next();

  } catch (error) {
    console.log("Error in verification of user", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;