import { Navigate, Outlet } from 'react-router-dom';
import { selectUserLogin } from '../../selectors';
import { useSelector } from 'react-redux';

export const ProtectedRoute = () => {
	const login = useSelector(selectUserLogin);

	return login ? <Outlet /> : <Navigate to={'/login'} />;
};
