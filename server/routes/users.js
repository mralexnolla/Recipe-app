import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await UserModel.find({});
    res.json(response)
  } catch (error) {
    res.json(error)
  }
  
})

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  
  if (user) {
    return res.json({ message: `User already exist`, userID:user._id });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  res.json({ message: `user registerd successfully`, data: newUser });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  
  if (!user) {
    return res.json({ message: `User does not exist` });
  }

  const isPwordValid = await bcrypt.compare(password, user.password);
  if (!isPwordValid) {
    return res.json({ message: `invalid password` });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({message: `user successfully logged in`,token,userID: user._id, pword: isPwordValid });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if(token){  // if there is a token
    jwt.verify(token, "secret", (err) => {
      if(err) return res.sendStatus(403);
      next()
    });
  }else{ //if there is no token
      res.sendStatus(401)
  }
}
