import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectAccount } from '../../../../components';
import { selectAccounts } from '../../../../selectors';
import { Input } from '../../../../components/input/input';
import { updateAccountAsync } from '../../../../actions';
import styles from './accounts-transfer.module.scss';

export const AccountsTransfer = () => {
	const accounts = useSelector(selectAccounts);
	const dispatch = useDispatch();

	const [error, setError] = useState(null);
	const [moneyCount, setMoneyCount] = useState('');

	const [selectedAccountFrom, setSelectedAccountFrom] = useState(null);
	const [selectedAccountTo, setSelectedAccountTo] = useState(null);

	const handleChangeAccount = (setSelectedAccount) => (event) => {
		const accountIndex = event.target.selectedIndex;
		if (accountIndex) {
			setSelectedAccount(accounts[accountIndex - 1].id);
		} else {
			setSelectedAccount(null);
		}
	};

	const handleSubmit = () => {
		if (!selectedAccountFrom) {
			setError('Выберите счёт с которого будет перевод');
			return;
		}

		if (!selectedAccountTo) {
			setError('Выберите счёт на которого будет перевод');
			return;
		}

		if (selectedAccountFrom === selectedAccountTo) {
			setError('Выберите разные счёта, чтобы произвести перевод');
			return;
		}

		if (moneyCount === '' || Number(moneyCount) < 0 || isNaN(moneyCount)) {
			setError('Неверно задана сумма перевода');
			return;
		}

		Promise.all([
			dispatch(
				updateAccountAsync(
					{ id: selectedAccountFrom, count: Number(moneyCount) },
					'minus',
				),
			),
			dispatch(
				updateAccountAsync(
					{ id: selectedAccountTo, count: Number(moneyCount) },
					'plus',
				),
			),
		]).then(([accountFromData, accountToData]) => {
			if (!accountFromData || !accountToData) {
				setError('Произошла ошибка, попробуйте ещё раз');
			} else {
				setError(null);
			}

			setSelectedAccountFrom(null);
			setSelectedAccountTo(null);
			setMoneyCount('');
		});
	};

	const handleChangeMoney = (e) => {
		const inputValue = e.target.value;
		setMoneyCount(inputValue);
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Перевод</h2>

			<SelectAccount
				optionsList={accounts}
				value={
					selectedAccountFrom
						? accounts.find((acc) => acc.id === selectedAccountFrom)?.title
						: ''
				}
				onChange={handleChangeAccount(setSelectedAccountFrom)}
				label="Перевод со счета"
				width={'100%'}
				left={'-48px'}
			/>

			<SelectAccount
				optionsList={accounts}
				value={
					selectedAccountTo
						? accounts.find((acc) => acc.id === selectedAccountTo)?.title
						: ''
				}
				onChange={handleChangeAccount(setSelectedAccountTo)}
				label="Перевод на счет"
				width={'100%'}
				left={'-48px'}
			/>

			<Input
				typeInput={'number'}
				placeholder="Сумма"
				width={'89%'}
				margin="40px 0 0 0"
				value={moneyCount}
				onChange={handleChangeMoney}
			/>

			{error && <div className={styles.error}>{error}</div>}

			<button className={styles.btn} onClick={handleSubmit}>
				Перевести
			</button>
		</div>
	);
};
