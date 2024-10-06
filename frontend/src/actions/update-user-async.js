import { request } from '../utils';
import { setUser } from './set-user';

export const updateUserAsync = (login, oldPassword, newPassword) => (dispatch) =>
	request(`/changePassword`, 'PATCH', { login, oldPassword, newPassword }).then(
		(userData) => {
			if (userData.data) {
				dispatch(setUser(userData.data));
			}

			return userData;
		},
	);
