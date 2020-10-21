import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Layout from '../layout/layout';
import Model from '../../../components/user/model';
import Snackbar from '../../../components/user/snackbar';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';
import { getStore, getItems } from '../../../fetchApi/userAxios';
import { useStyles } from '../layout/layout.css.js';
import Backdrop from '../../../Test';

const Home = (props) => {
	const [ state, setState ] = useState({
		select: '',
		store: null,
		data: null
	});

	const [ count, setCount ] = useState();
	useEffect(() => {
		let cart = JSON.parse(localStorage.getItem('cart'));
		if (cart) {
			const totalArrCount = cart.map((item) => item.count);
			const totalCount = totalArrCount.reduce((a, b) => a + b, 0);
			setCount(totalCount);
		}

		(function getData() {
			getStore().then((res) => {
				setState((state) => {
					return {
						...state,
						store: res
					};
				});
			});
		})();
	}, []);
	const [ loading, setLoading ] = useState(false);
	let select = null;
	if (state.store) {
		select = state.store.map((data) => <MenuItem value={data.dealer_name}>{data.dealer_name}</MenuItem>);
	}
	const onSelectChange = (e) => {
		let cart = JSON.parse(localStorage.getItem('cart'));
		if (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length > 0) {
			if (cart[0].dealer_name !== e.target.value) {
				if (window.confirm('Are you sure you want to remove ?')) {
					localStorage.removeItem('cart');
					setCount(null);
					doTask();
				}
			} else {
				doTask();
			}
		} else {
			doTask();
		}

		function doTask() {
			console.log(e.target.value);
			if (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length > 0) {
				let cart = JSON.parse(localStorage.getItem('cart'));
				if (cart[0].dealer_name !== e.target.value) {
					localStorage.removeItem('cart');
					setCount(null);
				}
			}
			setState({
				...state,
				select: e.target.value
			});
			setLoading(true);
			getItems(e).then((res) => {
				setLoading(false);

				function invertColor(hex) {
					if (hex.indexOf('#') === 0) {
						hex = hex.slice(1);
					}
					// convert 3-digit hex to 6-digits.
					if (hex.length === 3) {
						hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
					}
					if (hex.length !== 6) {
						throw new Error('Invalid HEX color.');
					}
					// invert color components
					var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
						g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
						b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
					// pad each with zeros and return
					return '#' + padZero(r) + padZero(g) + padZero(b);
				}
				function padZero(str, len) {
					len = len || 2;
					var zeros = new Array(len).join('0');
					return (zeros + str).slice(-len);
				}
				console.log(res.data);
				setState({
					...state,
					select: e.target.value,
					data: res.data[0].products,
					live: res.data[0].live,
					image: res.data[0].image.thumbnail,
					color: res.data[0].color,
					address: res.data[0].address,
					font: invertColor(res.data[0].color)
				});
			});
		}
	};
	const classes = useStyles();
	const [ cart, setCart ] = useState(false);
	const onCartClick = (cart) => {
		setCart(true);
		let localCart = [];
		if (localStorage.getItem('cart')) {
			localCart = JSON.parse(localStorage.getItem('cart'));
			const exist = Boolean(localCart.find((item) => item._id === cart._id));
			if (!exist) {
				cart.count = 1;
				cart.dealer_name = state.select;
				localCart.push(cart);
				localStorage.removeItem('cart');
				localStorage.setItem('cart', JSON.stringify(localCart));
				console.log(localCart);
			}
		} else {
			cart.dealer_name = state.select;
			cart.count = 1;
			localCart.push(cart);
			localStorage.setItem('cart', JSON.stringify(localCart));
		}
		setTimeout(() => {
			setCart(false);
		}, 1000);
		let carts = JSON.parse(localStorage.getItem('cart'));
		const totalArrCount = carts.map((item) => item.count);
		const totalCount = totalArrCount.reduce((a, b) => a + b, 0);
		setCount(totalCount);
	};
	return (
		<React.Fragment>
			<Layout count={count}>
				<main>
					{cart ? <Snackbar open={true} message="Item added  to cart" /> : null}
					{/* Hero unit */}

					{!state.image ? (
						<div className={classes.heroContent}>
							<Container maxWidth="sm">
								<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
									My Mart
								</Typography>
								<Typography variant="h5" align="center" color="textSecondary" paragraph>
									Order from your nearest supermarket
								</Typography>
								<FormControl variant="filled" className={classes.formControl}>
									<InputLabel id="demo-simple-select-label">Select your mart </InputLabel>
									<Select onChange={onSelectChange} value={state.select} id="demo-simple-select">
										{select}
									</Select>
								</FormControl>
							</Container>
						</div>
					) : (
						<div
							style={{
								background: `linear-gradient(180deg, #5b5b5b 0%, ${state.color} 50%, #ffffff 100%)`,
								color: state.font
							}}
							className={classes.heroContentMarket}
						>
							{loading ? <Backdrop /> : null}
							<Container maxWidth="sm">
								<Typography
									style={{ color: state.font }}
									component="h1"
									variant="h2"
									align="center"
									color="textPrimary"
									gutterBottom
								>
									{state.select}
									<Typography component="h5" variant="h4">
										is {state.live ? 'Open for Orders' : 'Closed'}
									</Typography>
								</Typography>
								<Typography
									style={{ color: state.font }}
									variant="h5"
									align="center"
									color="textSecondary"
									paragraph
								>
									{state.address}
								</Typography>
								<Avatar className={classes.large}>
									<img alt="images" height="100%" width="100%" src={state.image} />
								</Avatar>
								<br />

								<FormControl variant="filled" className={classes.formControl}>
									<InputLabel id="demo-simple-select-filled-label">Select another mart </InputLabel>
									<Select onChange={onSelectChange} value={state.select} id="demo-simple-select">
										{select}
									</Select>
								</FormControl>
							</Container>
						</div>
					)}

					{/* End hero unit */}
					<Container className={classes.cardGrid} maxWidth="md">
						<Grid container spacing={4}>
							{state.data ? (
								state.data.map((card) => (
									<Grid item key={card} xs={12} sm={6} md={4}>
										<Card className={classes.card}>
											<Model cart={() => onCartClick(card)} view data={card}>
												<CardMedia
													className={classes.cardMedia}
													image={card.image.thumbnail}
													title="Image title"
												/>
												<CardContent className={classes.cardContent}>
													<Typography gutterBottom variant="h5" component="h2">
														{card.name}
														<Typography style={{ display: 'inline ', marginLeft: '40%' }}>
															₹{card.price}/{card.unit}
														</Typography>
													</Typography>
													<Typography>({card.title})</Typography>
													<Typography variant="caption">{card.description}</Typography>
												</CardContent>
											</Model>

											<Divider className={classes.divider} light />
											<CardActions>
												<Model cart={() => onCartClick(card)} data={card} />
												<Card
													style={{
														borderRadius: 10,
														padding: '5px 15px',
														fontSize: '15px',
														marginLeft: 20
													}}
													variant="outlined"
												>
													{card.cat}
												</Card>
												{card.stock > 0 ? (
													<Button
														onClick={() => onCartClick(card)}
														style={{
															borderRadius: 35,
															backgroundColor: '#2FEF92',
															padding: '18px 36px',
															fontSize: '10px',
															marginLeft: 20
														}}
														variant="contained"
													>
														<AddShoppingCartIcon />
													</Button>
												) : (
													<Button disabled> Out Of Stock</Button>
												)}
											</CardActions>
										</Card>
									</Grid>
								))
							) : (
								<Typography>Stores </Typography>
							)}
						</Grid>
						{!state.data ? (
							<div>
								<Grid container spacing={4}>
									{state.store ? (
										state.store.map((store) => (
											<Grid item key={store} xs={12} sm={6} md={4}>
												<Card className={classes.card}>
													<CardContent className={classes.cardContent}>
														<Typography gutterBottom variant="h5" component="h2">
															{store.dealer_name}
														</Typography>
													</CardContent>
												</Card>
											</Grid>
										))
									) : null}
								</Grid>
							</div>
						) : null}
					</Container>
				</main>
			</Layout>
		</React.Fragment>
	);
};

export default Home;
