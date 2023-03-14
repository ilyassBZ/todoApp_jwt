import User from "../model/User.js";

const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    //valid inputs
    if (!userName || !email || !password) {
      throw new Error("Please Provide All The Information");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new Error("Email Already In Use");
    }

    const user = await User.create({ userName, email, password });
    const token = user.createJWT();
    res.status(200).json({
      user: {
        email: user.email,
        userName: user.userName,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please Provide All Information");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }
    const token = user.createJWT();
    user.password = undefined;
    res.status(201).send({ user, token });
  } catch (err) {
    next(err);
  }
};
export { register, login };
