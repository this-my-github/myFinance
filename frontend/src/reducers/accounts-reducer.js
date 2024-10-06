import { ACTION_TYPE } from '../actions';

const initialAccountsState = [
	{
		id: null,
		title: '',
		count: '',
		icon: '*',
	},
];

export const accountsReducer = (state = initialAccountsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ACCOUNTS:
			return [...action.payload];

		case ACTION_TYPE.SET_ACCOUNT: {
			let isUpdate = false;

			const accounts = state.map((account) => {
				if (account.id === action.payload.id) {
					isUpdate = true;
					return action.payload;
				} else {
					return account;
				}
			});

			return isUpdate ? [...accounts] : [...state, action.payload];
		}

		case ACTION_TYPE.REMOVE_ACCOUNT: {
			return state.filter(({ id }) => id !== action.payload);
		}

		default:
			return state;
	}
};
