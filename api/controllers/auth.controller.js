import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
//using bcryptjs because bcryptjs gives Problems during deployment
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        next(errorHandler(400, "all field are required"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    try {
        await newUser.save();
        res.json({ message: "Signup successfull" });
    } catch (error) {
        next(error);
    }

}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        next(errorHandler(400, "all field are required"));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(400, 'User not Found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler('400', 'Invalid Password'));
        }
        const token = jwt.sign(
            { id: validUser._id,
                isAdmin: validUser.isAdmin
             },
            process.env.JWT_SECRET
        )

        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httponly: true
        }).json(rest)
    } catch (error) {
        next(error);
    }

}


export const google = async(req, res, next) =>{
  const {name, email, googlePhotoUrl} = req.body;

  try {
      const user = await User.findOne({email});
      if(user){
          const token = jwt.sign({id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
          const {password: pass, ...rest} = user._doc;
          res.status(200).cookie('access_token', token, {
              httponly:true
          }).json(rest);   
      }
      else{
          const generatedPassword = Math.random.toString(36).slice(-8) + Math.random.toString(36).slice(-8);
          const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

          const newUser = new User({
              username: name.toLowerCase().split(' ').join('') + Math.random.toString(9).slice(-4),
              email,
              password: hashedPassword,
              profilePicture:googlePhotoUrl
          })
          await newUser.save();
          const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
          const {password: pass, ...rest} = newUser._doc;
          res.status(200).cookie('access_token', token, {
              httponly:true
          }).json(rest);
      }
  } catch (error) {
      next(error);
  }
}