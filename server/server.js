const cors 		 = require("cors");
const express    = require("express");
const mongoose   = require("mongoose");
const bodyParser = require("body-parser");

const config =
	require("./configs/keys.config.js");

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(() =>
	{
		console.log("Database connected");

	})
	.catch((err) =>
	{
		console.log("Error on database connection", err);
		process.exit(1);

	});

const app  = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/books", require("./routes/Books"));
app.use("/api/users", require("./routes/Users"));

app.listen(port, "0.0.0.0", function()
{
	console.log("Server listening on port " + port);

});