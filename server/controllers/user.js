const UserModel = require("../models/user.model");
const TokenModel = require("../models/token.model");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");
const tokenModel = require("../models/token.model");
const sendEmail = require("../utils/SendEmail");

module.exports.newuser = async function (req, res, next) {
  try {
    req.body.password = passwordHash.generate(req.body.password);
    const isEmailExists = await UserModel.findOne({
      email: req.body.email,
    });

    if (isEmailExists) {
      return res.send({
        code: 401,
        message: "Email Already Exist",
      });
    }
    const savedData = await UserModel.create(req.body);
    savedData.save();
    return res.send({
      code: 201,
      message: "Signup Successfully",
      data: { name: savedData.name, email: savedData.email },
    });
  } catch (error) {
    return {
      message: error,
    };
  }
};

module.exports.loginUser = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.send({ message: "Invalid email or password" });
  }
  if (!passwordHash.verify(req.body.password, user.password)) {
    return res.send({ message: "Invalid password" });
  }
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.name,
    },
    process.env.PrivateKey,
    { expiresIn: "2d" }
  );

  return res.send({
    message: "Login successful",
    token: token,
    name: user.name,
  });
};
module.exports.users = async function (req, res) {
  const { authorization } = req.headers;
  const decodedToken = jwt.decode(authorization);
  const userId = decodedToken._id;
  const user = await UserModel.findOne({ _id: userId });
  res.send(user);
};

module.exports.sendPasswordlink = async function (req, res) {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user){
      return res.send({
        code:202,
        message:"email does not exist"
      })
    }
    let token = await TokenModel.findOne({ userId: user._id });
    const newToken = jwt.sign(
      {
        _id: user._id,
        username: user.name,
      },
      process.env.PrivateKey
    );
    if (!token) {
      token = await new TokenModel({
        userId: user._id,
        token: newToken,
      }).save();
    }
    const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}/`;
    await sendEmail(user.email, "Password Reset", url);
    res
      .status(200)
      .send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports.verifyLink = async function (req, res) {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await TokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });
    res.status(200).send("Valid Url");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports.newPassword = async function (req,res) {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await TokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    if (!user.verified) user.verified = true;

    req.body.password = passwordHash.generate(req.body.password);
    await UserModel.findOneAndUpdate({ _id: user._id }, { password: req.body.password },{new:true});

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
