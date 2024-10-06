import { useState } from 'react';
import { NewAccount } from '../new-account/new-account';
import { Modal } from '../modal/modal';
import { Icon } from '../icon/icon';
import styles from './account.module.css';

export const Account = ({ item }) => {
	const [isOpen, setIsOpen] = useState(false);

	const updateOperation = () => {
		setIsOpen(true);
	};

	return (
		<div className={styles.info} onClick={() => updateOperation()}>
			<div className={styles.title}>
				<Icon id={item.icon || 'fa-users'} margin="0 15px 0 5px" size="30px" />
				<div>{item.title}</div>
			</div>
			<div>
				{item.count} {'Br'}
			</div>

			{isOpen && (
				<Modal width={'600px'} onClose={() => setIsOpen(false)}>
					<NewAccount item={item} onClose={() => setIsOpen(false)} />
				</Modal>
			)}
		</div>
	);
};
