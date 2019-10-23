const jwt 	   = require("jsonwebtoken");
const config   = require("../configs/keys.config.js");
const axios    = require("axios");
const mongoose = require("mongoose");

const Users =
	require("../models/Users");

const Books =
	require("../models/Books");

module.exports =
{
	List: (req, res) =>
	{
		const data =
			req.query;

		const filters = {
			category: data.category

		};

		function find(filters, payload, isAuthError)
		{
			let items =
			{
				books: []

			};

			if(!payload && data.tab !== "browse")
			{
				res.status(200).json({ ...items });

			}
			else
			{
				if(payload && data.tab === "favorites")
					filters.favorites = mongoose.Types.ObjectId(payload.user.id);

				Books.aggregate
				([
					{ $match: { ...filters }},
					{ $unset: [ "_id", "likes", "favorites" ]},

					{
						$facet:
						{
							"stage1": [{ $group: { _id: null, count: { $sum: 1 }}}],
							"stage2": [{ $skip: parseInt(data.skip) }, { $limit: 12 }]

						}

					},

					{ $unwind: "$stage1" },
					{ $project: { total: "$stage1.count", data: "$stage2" }}

				])
				.then(books =>
				{
					if(books.length)
					{
						items.total = books[0].total;
						items.books = books[0].data.map(item =>
						{
							return { ...item, reviews: item.reviews.length	};

						});

					}

					if(isAuthError)
						items.error = "authorization";

					res.status(200).json({ ...items });

				})
				.catch(error =>
				{
					res.status(400).json({ error: { internal: "An internal error occurred." }});

				});

			}

		};

		if(req.headers.authorization)
		{
			jwt.verify(req.headers.authorization.replace("Bearer ", ""), config.jwt.secrect, (error, payload) =>
			{
				find(filters, payload, !Boolean(payload));

			});

		}
		else
			find(filters);

	},

	Read: (req, res) =>
	{
		const data =
			req.params;

		const fields = {
			_id: false

		};

		function find(fields, payload, isAuthError)
		{
			if(!payload)
			{
				fields.likes 	 = false;
				fields.favorites = false;

			}

			Books.findOne({ id: data.id }, { ...fields })

				.then(book =>
				{
					let items =
					{
						book: {}

					};

					if(book)
					{
						items.book = {
							...book._doc, reviews: book.reviews.length

						};

						if(payload)
						{
							items.book.like	    = Boolean(book.likes.filter	   (item => { return item == payload.user.id; }).length);
							items.book.favorite = Boolean(book.favorites.filter(item => { return item == payload.user.id; }).length);

							delete items.book.likes;
							delete items.book.favorites;

						}

						if(isAuthError)
							items.error = "authorization";

					}

					res.status(200).json({ ...items });

				})
				.catch(error =>
				{
					res.status(400).json({ error: { internal: "An internal error occurred." }});

				});

		};

		if(req.headers.authorization)
		{
			jwt.verify(req.headers.authorization.replace("Bearer ", ""), config.jwt.secrect, (error, payload) =>
			{
				find(fields, payload, !Boolean(payload));

			});

		}
		else
			find(fields);

	},

	Like: (req, res) =>
	{
		const data =
			req.body;

		jwt.verify(req.headers.authorization.replace("Bearer ", ""), config.jwt.secrect, (error, payload) =>
		{
			if(payload)
			{
				Books.findOneAndUpdate({ id: data.id }, { $push: { likes: payload.user.id }}, { _id: false, new: true, fields: { _id: false, likes: false } })

					.then(book =>
					{
						Users.findByIdAndUpdate(payload.user.id, { $inc: { "score.likes": 1 }}, { new: true })

							.then(user =>
							{
								let items =
								{
									book: { ...book._doc,

										like	: true,
										favorite: Boolean(book.favorites.filter(item => { return item == payload.user.id; }).length),
										reviews : book.reviews.length

									},

									user: {

										token: jwt.sign({ iss: "localhost", aud: "localhost", sub: payload.user.id, user: { ...payload.user, score: user.score }}, config.jwt.secrect, { expiresIn: "1m" })

									}

								};

								delete items.book.favorites;

								res.status(200).json({ ...items });

							})
							.catch(error =>
							{
								res.status(400).json({ error: { internal: "An internal error occurred." }});

							});

					})
					.catch(error =>
					{
						res.status(400).json({ error: { internal: "An internal error occurred." }});

					});

			}
			else
				res.status(200).json({ error: "authorization" });

		});

	},

	Dislike: (req, res) =>
	{
		const data =
			req.body;

		jwt.verify(req.headers.authorization.replace("Bearer ", ""), config.jwt.secrect, (error, payload) =>
		{
			if(payload)
			{
				Books.findOneAndUpdate({ id: data.id }, { $pull: { likes: payload.user.id }}, { new: true, fields: { _id: false, likes: false } })

					.then(book =>
					{
						Users.findByIdAndUpdate(payload.user.id, { $inc: { "score.likes": -1 }}, { new: true })

							.then(user =>
							{
								let items =
								{
									book: { ...book._doc,

										like	: false,
										favorite: Boolean(book.favorites.filter(item => { return item == payload.user.id; }).length),
										reviews : book.reviews.length

									},

									user: {

										token: jwt.sign({ iss: "localhost", aud: "localhost", sub: payload.user.id, user: { ...payload.user, score: user.score }}, config.jwt.secrect, { expiresIn: "1m" })

									}

								};

								delete items.book.favorites;

								res.status(200).json({ ...items });

							})
							.catch(error =>
							{
								res.status(400).json({ error: { internal: "An internal error occurred." }});

							});

					})
					.catch(error =>
					{
						res.status(400).json({ error: { internal: "An internal error occurred." }});

					});

			}
			else
				res.status(200).json({ error: "authorization" });

		});

	},

	Favorite: (req, res) =>
	{
		const data =
			req.body;

		jwt.verify(req.headers.authorization.replace("Bearer ", ""), config.jwt.secrect, (error, payload) =>
		{
			if(payload)
			{
				Books.findOneAndUpdate({ id: data.id }, { $push: { favorites: payload.user.id }}, { new: true, fields: { _id: false, favorites: false } })

					.then(book =>
					{
						Users.findByIdAndUpdate(payload.user.id, { $inc: { "score.favorites": 1 }}, { new: true })

							.then(user =>
							{
								let items =
								{
									book: { ...book._doc,

										like	: Boolean(book.likes.filter(item => { return item == payload.user.id; }).length),
										favorite: true,
										reviews : book.reviews.length

									},

									user: {

										token: jwt.sign({ iss: "localhost", aud: "localhost", sub: payload.user.id, user: { ...payload.user, score: user.score }}, config.jwt.secrect, { expiresIn: "1m" })

									}

								};

								delete items.book.likes;

								res.status(200).json({ ...items });

							})
							.catch(error =>
							{
								res.status(400).json({ error: { internal: "An internal error occurred." }});

							});

					})
					.catch(error =>
					{
						res.status(400).json({ error: { internal: "An internal error occurred." }});

					});

			}
			else
				res.status(200).json({ error: "authorization" });

		});

	},

	Unfavorite: (req, res) =>
	{
		const data =
			req.body;

		jwt.verify(req.headers.authorization.replace("Bearer ", ""), config.jwt.secrect, (error, payload) =>
		{
			if(payload)
			{
				Books.findOneAndUpdate({ id: data.id }, { $pull: { favorites: payload.user.id }}, { new: true, fields: { _id: false, favorites: false } })

					.then(book =>
					{
						Users.findByIdAndUpdate(payload.user.id, { $inc: { "score.favorites": 1 }}, { new: true })

							.then(user =>
							{
								let items =
								{
									book: { ...book._doc,

										like	: Boolean(book.likes.filter(item => { return item == payload.user.id; }).length),
										favorite: false,
										reviews : book.reviews.length

									},

									user: {

										token: jwt.sign({ iss: "localhost", aud: "localhost", sub: payload.user.id, user: { ...payload.user, score: user.score }}, config.jwt.secrect, { expiresIn: "1m" })

									}

								};

								delete items.book.likes;

								res.status(200).json({ ...items });

							})
							.catch(error =>
							{
								res.status(400).json({ error: { internal: "An internal error occurred." }});

							});

					})
					.catch(error =>
					{
						res.status(400).json({ error: { internal: "An internal error occurred." }});

					});

			}
			else
				res.status(200).json({ error: "authorization" });

		});

	},

	ListReviews: (req, res) =>
	{
		const data = {
			...req.params, ...req.query

		};

		function find(payload, isAuthError)
		{
			Books.findOne({ id: data.id }, { _id: false, id: true, title: true, reviews: Boolean(data.all) ? true : { $slice: [0, 4] }}).populate("reviews.user", { name: true })

				.then(async book =>
				{
					let items =
					{
						book   : book,
						reviews:
						{
							total: (await Books.findOne({ id: data.id }, { _id: false, "reviews._id": true })).reviews.length,
							items: book.reviews.map(item =>
							{
								delete item._doc._id;

								return { 
									...item._doc, user: { name: item.user.name	}

								};

							})

						}

					};

					if(isAuthError)
						items.error = "authorization";

					res.status(200).json({ ...items });

				})
				.catch(error =>
				{
					res.status(400).json({ error: { internal: "An internal error occurred." }});

				});

		}

		if(req.headers.authorization)
		{
			jwt.verify(req.headers.authorization.replace("Bearer ", ""), config.jwt.secrect, (error, payload) =>
			{
				find(payload, !Boolean(payload));

			});

		}
		else
			find();

	},

	CreateReview: (req, res) =>
	{
		const data = {
			...req.params, ...req.body, ...req.query

		};

		jwt.verify(req.headers.authorization.replace("Bearer ", ""), config.jwt.secrect, (error, payload) =>
		{
			if(payload)
			{
				Books.findOne({ id: data.id }, { _id: false, rating: true })

					.then(book =>
					{
						Books.findOneAndUpdate({ id: data.id }, { "rating.stars": ((book.rating.stars * book.rating.total) + data.rating) / (book.rating.total + 1), $inc: { "rating.total": data.rating, "rating.users": 1 }, $push: { reviews: { $each: [{ user: payload.user.id, rating: data.rating, review: data.review }], $sort: { datetime: -1 } } }}, { new: true, runValidators: true, fields: { _id: false, id: true, title: true, reviews: Boolean(data.all) ? true : { $slice: [0, 4] }}}).populate("reviews.user", { name: true })

							.then(book =>
							{
								Users.findByIdAndUpdate(payload.user.id, { $inc: { "score.reviews": 1 }}, { new: true })

									.then(async user =>
									{
										let items =
										{
											book   : book,
											reviews:
											{
												total: (await Books.findOne({ id: data.id }, { _id: false, "reviews._id": true })).reviews.length,
												items: book.reviews.map(item =>
												{
													delete item._doc._id;

													return { 
														...item._doc, user: { name: item.user.name	}

													};

												})

											},

											user: {

												token: jwt.sign({ iss: "localhost", aud: "localhost", sub: payload.user.id, user: { ...payload.user, score: user.score }}, config.jwt.secrect, { expiresIn: "1m" })

											}

										};

										res.status(200).json({ ...items });

									})
									.catch(error =>
									{
										res.status(400).json({ error: { internal: "An internal error occurred." }});

									});

							})
							.catch(error =>
							{
								try
								{
									let errors = {};

									Object.values(error.errors).map(item =>
									{
										errors[item.errors.review.properties.path] =
											item.errors.review.properties.message;

									});

									res.status(200).json({ error: errors });

								}
								catch(error)
								{
									res.status(400).json({ error: { internal: "An internal error occurred." }});

								}

							});

					})
					.catch(error =>
					{
						res.status(400).json({ error: { internal: "An internal error occurred." }});

					});

			}
			else
				res.status(200).json({ error: "authorization" });

		});		

	}

};