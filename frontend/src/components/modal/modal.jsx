import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../icon/icon';
import styles from './modal.module.css';

export const Modal = ({
	children,
	onClose,
	width = '',
	customStyles = { left: '0', right: '0', top: '0', bottom: '0' },
}) => {
	const modalRef = useRef();

	useEffect(() => {
		document.body.classList.add(styles.modalOpen);

		return () => {
			document.body.classList.remove(styles.modalOpen);
		};
	}, [onClose]);

	return createPortal(
		<div className={styles.container} style={customStyles}>
			<div className={styles.content} style={{ width }} ref={modalRef}>
				<div className={styles.closeBtn}>
					<button onClick={onClose}>
						<Icon id="fa-times" />
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>,
		document.body,
	);
};
