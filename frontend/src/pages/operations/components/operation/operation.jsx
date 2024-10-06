import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '../../../../components/icon/icon';
import { removeOperationAsync } from '../../../../actions';
import { Modal, NewOperation } from '../../../../components';
import { dateConverter } from '../../../../utils';
import styles from './operation.module.css';

export const Operation = ({ item }) => {
	const dispatch = useDispatch();

	const [isOpen, setIsOpen] = useState(false);
	const deleteOperation = (id) => {
		dispatch(removeOperationAsync(id));
	};

	const updateOperation = (id) => {
		setIsOpen(true);
	};

	return (
		<div className={styles.container}>
			<div>{dateConverter(item.publishedAt)}</div>
			<div className={styles.operationBlock}>
				<div className={styles.operation}>
					<div className={styles.leftGroup}>
						<div className={styles.operationText}>
							<Icon
								id={item.icon || 'fa-users'}
								margin="5px 15px 0 0"
								size="30px"
							/>
							<div className={styles.operationTitle}>
								<strong>{item.title}</strong>
								<div>{item.account}</div>
							</div>
						</div>
						<div className={styles.count}>
							{item.count} {'Br'}
						</div>
					</div>

					<div className={styles.buttons}>
						<button onClick={() => updateOperation(item.id)}>
							<Icon id="fa-pencil" margin="0 0 0 10px" />
						</button>
						<button onClick={() => deleteOperation(item.id)}>
							<Icon id="fa-trash-o" margin="0 0 0 10px" />
						</button>
					</div>
				</div>
				<div className={styles.comment}>{item.comment}</div>
			</div>

			{isOpen && (
				<Modal width={'600px'} onClose={() => setIsOpen(false)}>
					<NewOperation item={item} onClose={() => setIsOpen(false)} />
				</Modal>
			)}
		</div>
	);
};
