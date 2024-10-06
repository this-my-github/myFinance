import { setUser } from '../actions';
import { request } from './request';

export const checkAuth = () => (dispatch) =>
	request('/profile')
		.then(({ user }) => {
			if (user) {
				dispatch(setUser(user));
			}

			return user;
		})
		.catch((error) => {
			console.error('Authentication check failed:', error);
		});
