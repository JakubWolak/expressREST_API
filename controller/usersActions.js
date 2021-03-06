const User = require("../models/user");
const encrypt = require("bcrypt");
const responses = require("../utils/responseUtils");
const token = require("../utils/generateToken");

require("dotenv").config();

const register = async (req, res) => {
    const newUser = {};

    newUser["username"] = req.body.username.toLowerCase();
    newUser["password"] = encrypt.hashSync(req.body.password, process.env.SALT);
    console.log(User.findAndCountAll);
    const sameUsers = await User.findAndCountAll({
        where: {
            username: newUser.username,
        },
    });

    if (sameUsers.count) {
        return responses.failureUser(res, 401, "Username is already taken");
    }

    User.create(newUser)
        .then((user) => {
            return res.status(200).json({
                success: true,
                message: "User created successfully",
                data: {
                    user: {
                        id: user.id,
                        username: user.username
                    }
                },
            });
        })
        .catch((err) => {
            console.log(err);
            return responses.failureUser(res, 401, "Error occured");
        });
};

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const user = await User.findOne({
        where: {
            username: username,
        },
    });

    if (user) {
        const result = await encrypt.compare(password, user.password);

        if (result) {
            return responses.successUser(res, token.generateAccessToken(username));
        } else {
            return responses.failureUser(res, 401, "Invalid password");
        }
    } else {
        return responses.failureUser(
            res,
            401,
            "User with given username has not been found"
        );
    }
};

module.exports = {
    register,
    login,
};