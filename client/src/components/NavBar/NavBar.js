import React, { useState } from 'react';

//react-router-dom
import { NavLink, useHistory } from 'react-router-dom';

//mobX-react-lite  && store
import { observer } from 'mobx-react-lite';
import Auth from './../../store/Auth';

//material-ui
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

//styles variables
const useStyles = makeStyles(theme => ({
	typography: {
		padding: theme.spacing(2),
		'&:hover': {
			cursor: 'pointer',
		},
	},
	link: {
		color: 'green',
		padding: 10,
		border: '2px solid green',
		borderRadius: 10,
		textDecoration: 'none',
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: 15,
	},
	selected: {
		color: 'white',
		backgroundColor: 'green',
	},
	blockLogIndUser: {
		display: 'flex',
		alignItems: 'center',
	},
	imgStyleAvatar: {
		width: 40,
		height: 40,
		borderRadius: '50%',
		marginLeft: 15,
	},
}));

const NavBar = observer(() => {
	const history = useHistory();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	function pushProfile() {
		history.push('/auth');
		setAnchorEl(null);
	}

	return (
		<div className={classes.header}>
			<NavLink
				exact
				to='/'
				className={classes.link}
				activeClassName={classes.selected}
			>
				Home
			</NavLink>

			{Auth.getAuth && Auth.getUser ? (
				<>
					<div className={classes.blockLogIndUser}>
						{Auth.getUser.name}
						<img
							onClick={handleClick}
							aria-describedby={id}
							src={Auth.getUser.picture}
							alt=''
							className={classes.imgStyleAvatar}
						/>
					</div>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
					>
						<Typography
							className={classes.typography}
							onClick={pushProfile}
						>
							Profile
						</Typography>
					</Popover>
				</>
			) : (
				<NavLink
					exact
					to='/auth'
					className={classes.link}
					activeClassName={classes.selected}
				>
					Auth
				</NavLink>
			)}
		</div>
	);
});

export default NavBar;
