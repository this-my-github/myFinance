import { ACTION_TYPE } from '../actions';

const initialOperationsState = [
	{
		id: null,
		account: null,
		account_id: null,
		category_id: null,
		comment: null,
		count: null,
		published_at: null,
		title: null,
		type: null,
	},
];

export const operationsReducer = (state = initialOperationsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_OPERATIONS:
			return [...action.payload];

		case ACTION_TYPE.SET_OPERATION: {
			let isUpdate = false;

			const operations = state.map((operation, index) => {
				if (operation.id === action.payload.id) {
					isUpdate = true;
					return action.payload;
				} else {
					return operation;
				}
			});

			return isUpdate ? [...operations] : [...state, action.payload];
		}

		case ACTION_TYPE.REMOVE_OPERATION: {
			return state.filter(({ id }) => id !== action.payload);
		}

		default:
			return state;
	}
};
