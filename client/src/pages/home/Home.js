import React from 'react';

//mobx
import { observer } from 'mobx-react-lite';

//stroe
import Auth from './../../store/Auth';
import SortBar from '../../components/SortBar/SortBar';

//material-ui
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'auto',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		maxHeight: '600px',
		overflow: 'auto',
	},
	card: {
		height: 'fit-content',
		'&:hover': {
			cursor: 'grab',
		},
	},
	blocks: {
		'& > div': {
			borderRadius: 12,
		},
	},
	item: {
		height: 'fit-content',
		marginBottom: 15,
	},
	divider: {
		borderRight: '2px solid black',
	},
}));

const Home = observer(
	({
		resAfterSendCard,
		msgAfterReq,
		resError,
		usersList,
		doubleClicks,
		openModal,
		closeModal,
		dataModal,
		dragStartHandler,
		usersListAuthUser,
		dragEndHandlerBoard,
		dragOverHandlerBoard,
		dropHandler,
		requestSort,
		getClassNamesFor,
	}) => {
		const classes = useStyles();

		return (
			<>
				{resAfterSendCard ? (
					<Alert severity={resError ? 'error' : 'success'}>
						{msgAfterReq}
					</Alert>
				) : null}
				<SortBar
					requestSort={requestSort}
					getClassNamesFor={getClassNamesFor}
				/>
				<Grid container spacing={2} className='blocks'>
					<Grid
						item
						xs={Auth.getUser && Auth.getAuth ? 6 : 12}
						className={
							Auth.getUser && Auth.getAuth
								? classes.divider
								: null
						}
					>
						{usersList.map(card => {
							const {
								id,
								name,
								surname,
								email,
								address,
								website,
								username,
							} = card;

							return (
								<Grid
									key={id}
									item
									xs={12}
									className={classes.item}
								>
									<Card
										variant='outlined'
										onClick={() => doubleClicks(id + 1)}
										onDragStart={e =>
											dragStartHandler(e, card)
										}
										draggable={true}
										className={classes.card}
									>
										<CardContent>
											<Typography
												color='textSecondary'
												gutterBottom
											>
												{id}. {username}
											</Typography>
											<Typography
												color='textSecondary'
												gutterBottom
											>
												{name} {surname}
											</Typography>
											<Typography
												color='textSecondary'
												gutterBottom
											>
												Email: {email}
											</Typography>
											<Typography
												color='textSecondary'
												gutterBottom
											>
												Address: {address.city}
											</Typography>
											<Typography
												color='textSecondary'
												gutterBottom
											>
												Website: {website}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							);
						})}
					</Grid>
					{Auth.getUser && Auth.getAuth ? (
						<Grid
							item
							xs={6}
							className={`${classes.blocks} drop-block`}
							onDragOver={e => dragOverHandlerBoard(e)}
							onDragLeave={e => dragEndHandlerBoard(e)}
							onDrop={e => dropHandler(e)}
						>
							{usersListAuthUser.map(card => {
								const {
									id,
									name,
									surname,
									email,
									address,
									website,
									username,
								} = card;

								return (
									<Grid
										key={id}
										item
										xs={12}
										className={classes.item}
									>
										<Card
											variant='outlined'
											className={classes.card}
										>
											<CardContent>
												<Typography
													color='textSecondary'
													gutterBottom
												>
													{id}. {username}
												</Typography>
												<Typography
													color='textSecondary'
													gutterBottom
												>
													{name} {surname}
												</Typography>
												<Typography
													color='textSecondary'
													gutterBottom
												>
													Email: {email}
												</Typography>
												<Typography
													color='textSecondary'
													gutterBottom
												>
													Address: {address.city}
												</Typography>
												<Typography
													color='textSecondary'
													gutterBottom
												>
													Website: {website}
												</Typography>
											</CardContent>
										</Card>
									</Grid>
								);
							})}
						</Grid>
					) : null}
				</Grid>

				<Modal
					aria-labelledby='transition-modal-title'
					aria-describedby='transition-modal-description'
					className={classes.modal}
					open={openModal}
					onClose={closeModal}
					closeAfterTransition
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={openModal}>
						<Grid
							container
							item
							justify='center'
							sm={6}
							className={classes.paper}
						>
							{dataModal.map(({ id, title, body }) => {
								return (
									<Box m={1} key={id}>
										<Card
											item
											xs={12}
											variant='outlined'
											onClick={() => doubleClicks(id)}
										>
											<CardContent>
												<Typography variant='h6'>
													{title}
													<br />
												</Typography>
												<Typography variant='body1'>
													{body}
												</Typography>
											</CardContent>
										</Card>
									</Box>
								);
							})}
						</Grid>
					</Fade>
				</Modal>
			</>
		);
	}
);

export default Home;
