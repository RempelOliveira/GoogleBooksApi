import { getAuthUser } from "../utils/UserAuthentication";
import { SIGNUP_USER, SIGNIN_USER, SIGNOUT_USER, UPDATE_USER, RECOVER_PASSWORD, RECOVER_PASSWORD_UPDATE } from "../../Shared/actions/Users";

function Users(state = { data: getAuthUser() }, action)
{
	if(action.type === SIGNUP_USER)
	{
		return {
			...state, data: action.payload

		};

	}

	if(action.type === UPDATE_USER)
	{
		return {
			...state, data: action.payload

		};

	}

	if(action.type === SIGNIN_USER)
	{
		return {
			...state, data: action.payload

		};

	}

	if(action.type === SIGNOUT_USER)
	{
		return {
			...state, data: action.payload

		};

	}

	if(action.type === RECOVER_PASSWORD)
	{
		return {
			...state, data: action.payload

		};

	}

	if(action.type === RECOVER_PASSWORD_UPDATE)
	{
		return {
			...state, data: action.payload

		};

	}

	return state;

}

export default Users;