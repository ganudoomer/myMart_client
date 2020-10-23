import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Shop from '../../../Buy.svg';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles({
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	}
});

export default function TemporaryDrawer(props) {
	const classes = useStyles();
	const [ state, setState ] = React.useState({
		right: false
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};
	let button = (
		<React.Fragment>
			<Link style={{ textDecoration: 'none' }} to="/login">
				<Button className={classes.button}>Login</Button>
			</Link>
			<Divider />
			<Link style={{ textDecoration: 'none' }} to="/register">
				<Button className={classes.button}>Register</Button>
			</Link>
		</React.Fragment>
	);
	if (props.token) {
		button = (
			<React.Fragment>
				<Link to="/cart" style={{ textDecoration: 'none' }}>
					<IconButton>
						<Typography variant="subtitle1">{props.count}</Typography>
						<img alt="another Logo" width="30px" src={Shop} />
					</IconButton>
				</Link>
				<Divider />
				<Link to="/history" style={{ textDecoration: 'none' }}>
					<IconButton>
						<DescriptionIcon style={{ fontSize: 30 }} />
					</IconButton>
				</Link>
				<Divider />
				<Link to="/live" style={{ textDecoration: 'none' }}>
					<IconButton>
						<ShoppingBasketIcon style={{ fontSize: 25 }} />
						Live
					</IconButton>
				</Link>
				<Divider />
				<Link style={{ textDecoration: 'none' }} onClick={() => props.onLogout()} to="/logout">
					<Button className={classes.button}>Logout</Button>
				</Link>
			</React.Fragment>
		);
	}

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom'
			})}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>{button}</List>
		</div>
	);

	return (
		<div>
			<React.Fragment>
				<Button onClick={toggleDrawer('left', true)}>
					<MenuIcon />
				</Button>
				<Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
					{list('left')}
				</Drawer>
			</React.Fragment>
		</div>
	);
}
