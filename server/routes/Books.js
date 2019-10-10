const express =
	require("express");

const Books 	 = express.Router();
const Controller = require("../controllers/Books");

Books.route("/")
	.get(Controller.List);

Books.route("/:id")
	.get(Controller.Read);

Books.route("/:id/reviews")
	.get(Controller.ListReviews);

Books.route("/:id/reviews")
	.post(Controller.CreateReview);

Books.route("/like")
	.patch(Controller.Like);

Books.route("/dislike")
	.patch(Controller.Dislike);

Books.route("/favorite")
	.patch(Controller.Favorite);

Books.route("/unfavorite")
	.patch(Controller.Unfavorite);

module.exports = Books;