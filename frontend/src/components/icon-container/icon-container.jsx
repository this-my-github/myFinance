import { Icon } from '../icon/icon';
import styles from './icon-container.module.css';

export const IconContainer = ({ icons, selectedIcon, setSelectedIcon }) => {
	return (
		<div className={styles.container}>
			<div className={styles.label}>Иконки</div>
			<div className={styles.icons}>
				{icons.map((icon) => (
					<div
						key={icon}
						className={`${styles.icon} ${
							selectedIcon === icon ? styles.selected : ''
						}`}
					>
						<Icon
							id={icon}
							isClickable={true}
							size="35px"
							onClick={() => setSelectedIcon(icon)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
