import styles from './icon.module.css';

export const Icon = ({
	id,
	margin = '0px',
	size = '22px',
	isClickable = true,
	color,
	onClick = () => {},
}) => {
	const cursor = isClickable ? 'pointer' : 'default';

	return (
		<div
			className={styles.icon}
			style={{ margin, fontSize: size, cursor, color }}
			onClick={onClick}
		>
			<i className={`fa ${id}`} aria-hidden="true"></i>
		</div>
	);
};
