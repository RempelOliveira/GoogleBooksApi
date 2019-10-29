export const LIST_CATEGORIES = "LIST_CATEGORIES";

const categories =
[
	{
		id  : "typography",
		name: "Typography"

	},

	{
		id  : "myths",
		name: "Myths"

	},

	{
		id  : "photography",
		name: "Photography"

	},

	{
		id  : "science",
		name: "Science"

	},

	{
		id  : "android",
		name: "Android"

	},

	{
		id  : "ios",
		name: "iOS"

	},

	{
		id	: "flutter",
		name: "Flutter"

	}

];

export function List(category)
{
	return dispatch =>
	{
		const data =
			categories;

		dispatch({
			type: LIST_CATEGORIES, payload: data

		});

	};

};