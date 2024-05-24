import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


const secret = 'grissa';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //Check if user exists
        const user = await User.findOne({ email: email });
        if (!user) res.status(404).json({ message: `User with email ${email} not found` });
        else {
            //Check if password is correct
            bcrypt.compare(password, user.password, (error, match) => {
                if (error) res.status(403).json({ message: "Password Match Error!" })
                else if (match) {
                    //Check if user is active
                    if (user.is_actif) {
                        //Create token by JWT
                        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "10d" });
                        //Response with token
                        const result = {
                            _id: user._id,
                            name: user.name,
                            phone: user.phone,
                            email: user.email,
                            role: user.role,
                            avatar: user.avatar,
                        }
                        res.status(200).json({ user: result, token: token })
                    } else {
                        res.status(401).json({ message: "User is not actif" })
                    }
                } else res.status(403).json({ message: 'Password do not match!' })
            })
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

