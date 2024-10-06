import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { User } from './components';
import { Icon } from '../../../icon/icon';
import { Modal } from '../../../modal/modal';
import { selectAccounts, selectUserLogin } from '../../../../selectors';
import styles from './right-group.module.css';

export const RightGroup = () => {
	const login = useSelector(selectUserLogin);
	const accounts = useSelector(selectAccounts);
	const [isOpen, setIsOpen] = useState(false);

	const totalMoney = accounts.reduce((acc, { count }) => acc + count, 0);
	const onClose = () => setIsOpen(false);

	return (
		<div className={styles.container}>
			{!login ? (
				<button>
					<Link to="/login">Войти</Link>
				</button>
			) : (
				<>
					<span>
						{totalMoney} {'Br'}
					</span>
					<button onClick={() => setIsOpen(true)}>
						<Icon
							id="fa-user-circle"
							margin="3px 0 0 5px"
							size="27px"
							color={'white'}
							isClickable={true}
						/>
					</button>
				</>
			)}

			{isOpen && (
				<Modal
					onClose={onClose}
					customStyles={{
						right: '100px',
						top: '80px',
						backgroundColor: 'inherit',
						width: '280px',
					}}
				>
					<User onClose={onClose} />
				</Modal>
			)}
		</div>
	);
};
