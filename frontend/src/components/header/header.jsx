import { LeftGroup, RightGroup } from './components';
import styles from './header.module.css';

export const Header = () => {
	return (
		<div className={styles.container}>
			<LeftGroup />
			<RightGroup />
		</div>
	);
};
