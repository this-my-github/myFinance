import { useState } from 'react';
import { Icon } from '../icon/icon';
import { Modal } from '../modal/modal';
import styles from './card.module.css';

export const Card = ({
	headerTitle,
	list,
	NewListElement,
	item,
	errorMessage,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const onAdd = () => {
		setIsOpen(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>{headerTitle}</h3>
				<button onClick={() => onAdd()}>
					<Icon id="fa-plus-square-o" margin="3px 10px 0 0" size="30px" />
				</button>
			</div>
			{list.length > 0 ? (
				list.map((item) => (
					<div className={styles.list} key={item.id}>
						{children(item)}
					</div>
				))
			) : (
				<div className={styles.errorMessage}>{errorMessage}</div>
			)}

			{isOpen && (
				<Modal width={'600px'} onClose={() => setIsOpen(false)}>
					<NewListElement item={item} onClose={() => setIsOpen(false)} />
				</Modal>
			)}
		</div>
	);
};
