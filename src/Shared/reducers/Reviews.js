import { LIST_REVIEWS, CREATE_REVIEW } from "../actions/Reviews";

function Reviews(state = { data: { book: null, reviews: null }}, action)
{
	if(action.type === LIST_REVIEWS)
	{
		return {
			...state, data: action.payload

		};

	}

	if(action.type === CREATE_REVIEW)
	{
		return {
			...state, data: action.payload

		};
		
	}
	
	return state;

}

export default Reviews;