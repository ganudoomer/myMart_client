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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Shop from '../../../Buy.svg';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
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

	let list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom'
			})}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				<Link style={{ textDecoration: 'none' }} to="/login">
					<ListItem button>
						<ListItemIcon>
							<ListItemText primary="Login" />
						</ListItemIcon>
					</ListItem>
				</Link>
				<Divider />
				<Link style={{ textDecoration: 'none' }} to="/register">
					<ListItem button>
						<ListItemIcon>
							<ListItemText primary="Register" />
						</ListItemIcon>
					</ListItem>
				</Link>
				<Divider />
			</List>
		</div>
	);

	if (props.token) {
		list = (anchor) => (
			<div
				className={clsx(classes.list, {
					[classes.fullList]: anchor === 'top' || anchor === 'bottom'
				})}
				role="presentation"
				onClick={toggleDrawer(anchor, false)}
				onKeyDown={toggleDrawer(anchor, false)}
			>
				<List>
					<Link to="/cart" style={{ textDecoration: 'none' }}>
						<ListItem button>
							<IconButton>
								<img alt="another Logo" width="30px" src={Shop} />
							</IconButton>
							<ListItemIcon>
								<ListItemText primary="Cart" />
							</ListItemIcon>
						</ListItem>
					</Link>
					<Divider />
					<Link to="/history" style={{ textDecoration: 'none' }}>
						<ListItem button>
							<IconButton>
								<DescriptionIcon style={{ fontSize: 30 }} />
							</IconButton>
							<ListItemIcon>
								<ListItemText primary="Order History" />
							</ListItemIcon>
						</ListItem>
					</Link>
					<Divider />

					<Link to="/live" style={{ textDecoration: 'none' }}>
						<ListItem button>
							<IconButton>
								<ShoppingBasketIcon style={{ fontSize: 25 }} />
							</IconButton>
							<ListItemIcon>
								<ListItemText primary="Live Orders" />
							</ListItemIcon>
						</ListItem>
					</Link>
					<Divider />
					<Link style={{ textDecoration: 'none' }} onClick={() => props.onLogout()} to="/logout">
						<ListItem button>
							<IconButton>
								<ExitToAppIcon style={{ fontSize: 25 }} />
							</IconButton>
							<ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItemIcon>
						</ListItem>
					</Link>
				</List>
			</div>
		);
	}

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
