import { request } from '../utils';
import { setUser } from './set-user';

export const addUserAsync = (login, password) => (dispatch) => {
	request(`/register`, 'POST', { login, password }).then(({ error, user }) => {
		if (error) {
			return error;
		}

		dispatch(setUser(user));
	});
};
