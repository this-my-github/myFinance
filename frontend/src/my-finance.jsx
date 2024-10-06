import { Routes, Route } from 'react-router-dom';
import { Header, Footer, ProtectedRoute } from './components';
import {
	Registration,
	Authorization,
	Categories,
	Operations,
	MainPage,
	ChangePassword,
	ErrorPage,
} from './pages';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './utils';
import styles from './my-finance.module.css';

export const MyFinance = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.mainContent}>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route path="/" element={<MainPage />} />
						<Route path="/changepassword" element={<ChangePassword />} />
					</Route>
					<Route path="/login" element={<Authorization />} />
					<Route path="/registration" element={<Registration />} />

					<Route element={<ProtectedRoute />}>
						<Route path="/operations" element={<Operations />} />
						<Route path="/categories" element={<Categories />} />
					</Route>

					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};
