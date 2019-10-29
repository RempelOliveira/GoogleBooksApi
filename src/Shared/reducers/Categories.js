import { LIST_CATEGORIES } from "../actions/Categories";

function Categories(state = { categories: null }, action)
{
	if(action.type === LIST_CATEGORIES)
	{
		return {
			...state, data: action.payload

		};

	}

	return state;

}

export default Categories;