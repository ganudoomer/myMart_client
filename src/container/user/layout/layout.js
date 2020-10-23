import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import logo from '../../../SuperMart.svg';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/user/action';
import Shop from '../../../Buy.svg';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStyles } from './layout.css';
import { getCartItems } from '../../../fetchApi/userAxios';
import ResponsiveDrawer from './drawer';
const Layout = (props) => {
	const [ count, setCount ] = useState();
	let propCount = props.count;
	const checkAuth = props.checkAuth;
	useEffect(
		() => {
			if (localStorage.getItem('uToken')) {
				getCartItems(localStorage.getItem('uToken'))
					.then((res) => {
						console.log(res.data.orders);
						if (res.data.orders.length) {
							localStorage.setItem('cart', JSON.stringify(res.data.orders[0]));
							console.log('yes');
						}
					})
					.catch((err) => {
						console.log(err);
					});
			}
			checkAuth();
			countCart();
		},
		[ propCount, checkAuth ]
	);
	const countCart = () => {
		let cart = JSON.parse(localStorage.getItem('cart'));
		if (cart) {
			const totalArrCount = cart.map((item) => item.count);
			const totalCount = totalArrCount.reduce((a, b) => a + b, 0);
			setCount(totalCount);
		}
	};
	const classes = useStyles();
	let button = (
		<Fragment>
			<Link style={{ textDecoration: 'none' }} to="/login">
				<Button className={classes.button}>Login</Button>
			</Link>
			<Link style={{ textDecoration: 'none' }} to="/register">
				<Button className={classes.button}>Register</Button>
			</Link>
		</Fragment>
	);
	if (props.token) {
		button = (
			<Fragment>
				<Link to="/cart" style={{ textDecoration: 'none' }}>
					<IconButton>
						<Typography variant="subtitle1">{count}</Typography>
						<img alt="another Logo" width="30px" src={Shop} />
					</IconButton>
				</Link>
				<Link to="/history" style={{ textDecoration: 'none' }}>
					<IconButton>
						<DescriptionIcon style={{ fontSize: 30 }} />
					</IconButton>
				</Link>
				<Link to="/live" style={{ textDecoration: 'none' }}>
					<IconButton>
						<ShoppingBasketIcon style={{ fontSize: 25 }} />
						Live
					</IconButton>
				</Link>
				<Link style={{ textDecoration: 'none' }} onClick={() => props.onLogout()} to="/logout">
					<Button className={classes.button}>Logout</Button>
				</Link>
			</Fragment>
		);
	}

	return (
		<React.Fragment>
			<div>
				<CssBaseline />
				<AppBar color="white" position="sticky">
					<Toolbar>
						<Typography variant="h6" color="inherit" noWrap>
							<Link to="/">
								<img alt="logo" src={logo} />
							</Link>
						</Typography>
						<div className={classes.nav} style={{ marginLeft: 'auto' }}>
							{button}
						</div>
						<div className={classes.revNav} style={{ marginLeft: 'auto' }}>
							<ResponsiveDrawer token={props.token} count={count} onLogout={props.onLogout} />
						</div>
					</Toolbar>
				</AppBar>
			</div>
			{props.children}
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.user.login,
		error: state.user.error,
		loading: state.user.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(actionCreators.logoutUser()),
		checkAuth: () => dispatch(actionCreators.check())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
