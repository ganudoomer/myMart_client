import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from './table';
import * as actionCreators from '../../store/actions/dealer/action';
import * as Axios from '../../fetchApi/dealerAxios';
import { BarLoader } from 'react-spinners';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto'
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4)
	},
	fixedHeight: {
		height: 150
	}
}));

const Dashboard = (props) => {
	const [ state, setState ] = useState({
		data: null
	});

	useEffect(() => {
		(async function getData() {
			const data = {
				token: localStorage.getItem('dToken')
			};
			Axios.getAllProducts(data).then((res) => {
				setState({
					data: res.data[0].products
				});
			});
		})();
	}, []);
	const classes = useStyles();
	const delHandler = (id) => {
		let result = state.data.filter((products) => products._id !== id);
		console.log(result);
		setState({
			data: result
		});
	};

	return (
		<main className={classes.content}>
			<div style={{ margin: 20 }} />

			<Container maxWidth="lg" className={classes.container}>
				<Box pt={4} />
				<NavLink to="/dealer/dash/product/add">
					<Button variant="contained" color="primary">
						Add
					</Button>
				</NavLink>
				<br />
				<br />
				{state.data ? <Table data={state.data} del={delHandler} /> : <BarLoader width="800" />}
			</Container>
		</main>
	);
};
const mapStateToProps = (state) => {
	return {
		token: state.dealer.token,
		error: state.dealer.error,
		loading: state.dealer.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSubmitForm: (userame, password) => dispatch(actionCreators.authDealer(userame, password))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
