const express =
	require("express");

const Users 	 = express.Router();
const Controller = require("../controllers/Users");

Users.route("/sign-up")
	.post(Controller.SignUp);

Users.route("/sign-in")
	.post(Controller.SignIn);

Users.route("/update")
	.patch(Controller.Update);

Users.route("/recover-password")
	.post(Controller.RecoverPassword);

Users.route("/recover-password/update")
	.patch(Controller.RecoverPasswordUpdate);

module.exports = Users;