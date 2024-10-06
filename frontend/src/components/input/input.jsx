import { forwardRef } from 'react';
import styles from './input.module.scss';

export const Input = forwardRef(
	(
		{
			typeInput,
			placeholder,
			errorMessage,
			widthContainer = '20rem',
			width = '17.4rem',
			margin,
			...props
		},
		ref,
	) => {
		const inputStyle = errorMessage
			? `${styles.form__input} ${styles.form__input_error}`
			: styles.form__input;

		return (
			<div className={styles.form} style={{ width: widthContainer, margin }}>
				<input
					type={typeInput}
					id={placeholder}
					className={inputStyle}
					autoComplete="off"
					placeholder=" "
					style={{ width }}
					{...props}
					ref={ref}
				/>
				<label htmlFor={placeholder} className={styles.form__label}>
					{placeholder}
				</label>
				{errorMessage && <div className={styles.error}>{errorMessage}</div>}
			</div>
		);
	},
);
