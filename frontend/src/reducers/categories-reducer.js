import { ACTION_TYPE } from '../actions';

const initialCategoriesState = [
	{
		id: null,
		userId: null,
		type: null,
		title: null,
		iconUrl: null,
	},
];

export const categoriesReducer = (state = initialCategoriesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORIES:
			return [...action.payload];

		case ACTION_TYPE.SET_CATEGORY: {
			let isUpdate = false;

			const categories = state.map((category) => {
				if (category.id === action.payload.id) {
					isUpdate = true;
					return action.payload;
				} else {
					return category;
				}
			});

			return isUpdate ? [...categories] : [...state, action.payload];
		}

		case ACTION_TYPE.REMOVE_CATEGORY: {
			return state.filter(({ id }) => id !== action.payload);
		}

		default:
			return state;
	}
};
