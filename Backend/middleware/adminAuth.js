import jwt from "jsonwebtoken";
import User from "../models/user.js";

const secret = 'grissa';

const adminAuth = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;
      
      let decodedData;

      if (token && isCustomAuth) {      
        decodedData = jwt.verify(token, secret);
        req.userId = decodedData.id;
        const user = await User.findById(decodedData.id);
        if (user && user.role < 3) {
          next()
        } else {
          res.status(403).send();
        }
      } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData.sub;
        const user = await User.findById(decodedData.id);
        if (user && user.role < 3) {
          next()
        } else {
          res.status(403).send();
        }
      }    
    }
  } catch (error) {
    console.log(error);
  }
};

export default adminAuth;
