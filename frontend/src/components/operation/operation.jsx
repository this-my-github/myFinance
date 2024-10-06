import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../modal/modal';
import { Icon } from '../icon/icon';
import { CATEGORY_TYPE } from '../../constants';
import { NewOperation } from '../new-operation/new-operation';
import { loadCategoriesAsync } from '../../actions';
import styles from './operation.module.css';

export const Operation = ({ item }) => {
	const [isOpen, setIsOpen] = useState(false);

	const updateOperation = () => {
		setIsOpen(true);
	};
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadCategoriesAsync());
	}, [dispatch]);

	return (
		<div className={styles.title} onClick={() => updateOperation()}>
			<div className={styles.leftGroup}>
				<div className={styles.icon}>
					<Icon id={item.icon} margin="0 15px 0 5px" size="30px" />
				</div>
				<div className={styles.itemTitle}>{item.title}</div>
			</div>
			<div className={styles.itemCount}>
				{item.count} {'Br '}
				{item.type === CATEGORY_TYPE.EXPENSES ? (
					<span className={styles.arrowRed}>▼</span>
				) : (
					<span className={styles.arrowGreen}>▲</span>
				)}
			</div>
			<div className={styles.itemAccount}>{item.account}</div>
			<div className={styles.itemDate}>{item.publishedAt}</div>

			{isOpen && (
				<Modal width={'600px'} onClose={() => setIsOpen(false)}>
					<NewOperation item={item} onClose={() => setIsOpen(false)} />
				</Modal>
			)}
		</div>
	);
};
