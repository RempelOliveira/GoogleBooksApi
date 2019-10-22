import { LIST, READ, UPDATE } from "../actions/Books";

function Books(state = { data: null }, action)
{
	if(action.type === LIST)
	{
		return {
			...state, data: !state.data || action.payload.clean ? action.payload : (!state.data.books ? action.payload : 
			{
				total: action.payload.total,
				books: [ ...state.data.books, ...action.payload.books ]

			})

		};
		
	}

	if(action.type === READ)
	{
		return {
			...state, data: action.payload

		};

    }

	if(action.type === UPDATE)
	{
		return {
			...state, data: action.payload

		};

    }

	return state;

}

export default Books;