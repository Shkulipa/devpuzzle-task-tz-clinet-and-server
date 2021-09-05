import React, { useEffect, useState } from 'react';

//react router-dom
import { useHistory } from 'react-router-dom';

//http
import { usersHttp } from '../../http/users';
import { postsHttp } from '../../http/posts';
import { getCardsHttp, postCardHttp } from '../../http/cards';

//components
import Home from './Home';
import useSortAbleData from '../../hooks/useSortAbleData';

//store
import Auth from '../../store/Auth';
import { refreshHttp } from '../../http/refresh';
import { observer } from 'mobx-react-lite';

const HomeContainer = observer(() => {
	const history = useHistory();

	//user list
	const [usersList, setUsersList] = useState([]);

	//if user is auth
	const [usersListAuthUser, setUsersListAuthUser] = useState([]);

	//errors
	const [resAfterSendCard, setResAfterSendCard] = useState(false);
	const [msgAfterReq, setMsgAfterReq] = useState('');
	const [resError, setResError] = useState(false);

	//sort hook
	const { items, requestSort, sortConfig } = useSortAbleData(usersList);

	useEffect(() => {
		usersHttp().then(({ data }) => {
			const sortedArr = data.sort(function (a, b) {
				if (a['username'] > b['username']) {
					return 1;
				}
				if (a['username'] < b['username']) {
					return -1;
				}
				return 0;
			});
			setUsersList(sortedArr);
		});

		if (Auth.getAuth && Auth.getUser) {
			getCardsHttp(Auth.getAccessToken.token)
				.then(res => {
					setUsersListAuthUser(res.data);
				})
				.catch(err => {
					console.error(err);
					Auth.setUser(false);
					Auth.setAuth(false);
					Auth.setAccessToken(null);
					localStorage.removeItem('accessToken');
					history.push('/');
				});
		}
	}, [Auth.getAuth]);

	const getClassNamesFor = name => {
		if (!sortConfig) {
			return;
		}
		return sortConfig.key === name ? sortConfig.direction : undefined;
	};

	//double click Modal
	const delay = 500;
	let timer = 0;
	const [oneClick, setOneClick] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [dataModal, setDataModal] = useState([]);

	const doubleClicks = async id => {
		if (oneClick === false) {
			setOneClick(true);
			timer = setTimeout(() => {
				setOneClick(false);
			}, delay);
		} else {
			clearTimeout(timer);
			setOneClick(false);

			const res = await postsHttp().then(res => {
				return res.data.filter(el => el.userId === id);
			});
			setDataModal(res);
			setOpenModal(true);
		}
	};

	//drag and drop
	const [currentItemDrag, setCurrentItemDrag] = useState(null);

	const closeModal = () => {
		setOpenModal(false);
	};

	const dragStartHandler = (e, card) => {
		setCurrentItemDrag(card);
	};

	const dragOverHandlerBoard = e => {
		e.preventDefault();
		e.target.closest('.drop-block').style.backgroundColor = '#00000026';
	};

	const dragEndHandlerBoard = e => {
		e.target.closest('.drop-block').style.backgroundColor = '';
	};

	// eslint-disable-next-line no-unused-vars
	let timerMsgAfterReq = 0;
	const dropHandler = async e => {
		e.preventDefault();
		if (!usersListAuthUser.includes(currentItemDrag)) {
			const now = new Date();
			const expires = new Date(Auth.getAccessToken.expires);
			if (now.getTime() >= expires.getTime()) {
				await refreshHttp();
			}

			await postCardHttp(Auth.getAccessToken.token, {
				card: currentItemDrag,
				userId: Auth.getUser._id,
			})
				.then(res => {
					if (!res.data.error) {
						clearTimeout(timer);
						setResError(false);
						setMsgAfterReq('Success, the card added');
						setResAfterSendCard(true);
						setUsersListAuthUser(res.data.data);
						return (timerMsgAfterReq = setTimeout(() => {
							setResAfterSendCard(false);
						}, 5e3));
					}

					clearTimeout(timer);
					setResError(true);
					setMsgAfterReq('Error, the card already exist in the list');
					setResAfterSendCard(true);
					return (timerMsgAfterReq = setTimeout(() => {
						setResAfterSendCard(false);
					}, 5e3));
				})
				.catch(err => {
					console.error(err);
					Auth.setUser(false);
					Auth.setAuth(false);
					Auth.setAccessToken(null);
					localStorage.removeItem('accessToken');
					history.push('/');
				});
		}
		e.target.closest('.drop-block').style.backgroundColor = '';
	};

	return (
		<>
			<Home
				resError={resError}
				resAfterSendCard={resAfterSendCard}
				msgAfterReq={msgAfterReq}
				requestSort={requestSort}
				getClassNamesFor={getClassNamesFor}
				usersList={items}
				usersListAuthUser={usersListAuthUser}
				doubleClicks={doubleClicks}
				openModal={openModal}
				closeModal={closeModal}
				dataModal={dataModal}
				dragStartHandler={dragStartHandler}
				dropHandler={dropHandler}
				dragOverHandlerBoard={dragOverHandlerBoard}
				dragEndHandlerBoard={dragEndHandlerBoard}
			/>
		</>
	);
});

export default HomeContainer;
