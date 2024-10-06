import { request } from '../utils';
import { setUser } from './set-user';

export const loginUser = (login, password) => (dispatch) =>
	request(`/login`, 'POST', { login, password }).then((userData) => {
		if (userData.user) {
			dispatch(setUser(userData.user));
		}

		return userData;
	});
