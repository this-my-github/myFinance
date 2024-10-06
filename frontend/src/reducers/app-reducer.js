import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLogout: false,
	lastDate: '',
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT: {
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		}

		case ACTION_TYPE.SET_LAST_DATE: {
			return {
				...state,
				lastDate: action.payload,
			};
		}

		default:
			return state;
	}
};
