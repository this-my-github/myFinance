import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './left-group.module.css';
import { Button } from '../../../button/button';

export const LeftGroup = () => {
	const [activeButton, setActiveButton] = useState(null);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/') {
			setActiveButton('home');
		} else if (location.pathname === '/operations') {
			setActiveButton('history');
		} else if (location.pathname === '/categories') {
			setActiveButton('categories');
		} else {
			setActiveButton(null);
		}
	}, [location.pathname]);

	return (
		<div className={styles.leftGroup}>
			<Link to="/">
				<Button
					active={activeButton === 'home'}
					onClick={() => setActiveButton('home')}
				>
					Главная
				</Button>
			</Link>
			<Link to="/operations">
				<Button
					active={activeButton === 'history'}
					onClick={() => setActiveButton('history')}
				>
					История
				</Button>
			</Link>
			<Link to="/categories">
				<Button
					active={activeButton === 'categories'}
					onClick={() => setActiveButton('categories')}
				>
					Категории
				</Button>
			</Link>
		</div>
	);
};
