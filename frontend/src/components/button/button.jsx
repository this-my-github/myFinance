import styles from './button.module.css';

export const Button = ({ children, active, onClick, activeStyle }) => {
	const buttonStyle = active
		? `${styles.button} ${styles.active}  ${activeStyle}`
		: styles.button;

	return (
		<button className={buttonStyle} onClick={onClick}>
			{children}
		</button>
	);
};
