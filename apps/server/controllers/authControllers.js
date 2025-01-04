const { User, Session } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const { Op } = require("sequelize");
// const { sendPasswordResetEmail } = require("../utils");
const {
  successResponse,
  successResponseWithData,
  errorResponse,
  validationErrorWithData,
} = require("../utils/responseHandlers");

const generateToken = (user) => {
  console.log("user ==>", user);
  const token = jwt.sign({ user_id: user.user_id }, jwtSecret, {
    expiresIn: "1h",
  });
  return token;
};

exports.signUp = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }],
      },
    });

    if (existingUser) {
      return errorResponse(res, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name: fname,
      last_name: lname,
      username: fname + lname,
      email,
      password_hash: hashedPassword,
    });

    const token = generateToken(newUser);

    const session = await Session.create({
      user_id: newUser.user_id,
      login_time: new Date(),
      token,
      status: 1,
    });

    return successResponseWithData(res, "User created successfully", {
      token,
      session_id: session.session_id,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal server error");
  }
};

// exports.signIn = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const user = await User.findOne({
//       where: { username },
//     });

//     if (!user) {
//       return errorResponse(res, "User not found");
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return errorResponse(res, "Invalid password");
//     }

//     const session = await Session.create({
//       user_id: user.user_id,
//       login_time: new Date(),
//       status: 1,
//     });

//     const token = generateToken(user);

//     return successResponseWithData(res, "Login successful", {
//       token,
//       session_id: session.session_id,
//     });
//   } catch (error) {
//     console.error(error);
//     return errorResponse(res, "Internal server error");
//   }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return errorResponse(res, "User not found");
//     }

//     const resetToken = jwt.sign(
//       { user_id: user.user_id },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "15m" }
//     );

//     await sendPasswordResetEmail(user.email, resetToken);

//     return successResponse(res, "Password reset email sent");
//   } catch (error) {
//     console.error(error);
//     return errorResponse(res, "Internal server error");
//   }
// };

// exports.changePassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findByPk(decoded.user_id);

//     if (!user) {
//       return errorResponse(res, "User not found");
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     await user.update({ password: hashedPassword });

//     return successResponse(res, "Password updated successfully");
//   } catch (error) {
//     console.error(error);
//     return errorResponse(res, "Internal server error");
//   }
// };
