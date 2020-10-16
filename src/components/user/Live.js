import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Model from './ItemModel';
import * as Axios from '../../fetchApi/userAxios';
import Stepper from './Stepper';
import { FadeLoader } from 'react-spinners';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 500,
		marginTop: 20,
		margin: 30
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	},
	large: {
		width: theme.spacing(8),
		height: theme.spacing(8)
	}
}));

export default function SimpleCard() {
	const [ state, setstate ] = useState({ data: null });
	useEffect(() => {
		getOrders();
	}, []);
	const getOrders = () => {
		Axios.getOrders({ token: localStorage.getItem('uToken') }).then((res) => {
			console.log(res.data);
			setstate({ data: res.data });
		});
	};
	const classes = useStyles();
	return (
		<div
			style={{
				width: 600,
				height: 500,
				overflow: 'scroll'
			}}
		>
			<IconButton onClick={getOrders}>
				<Refresh />
			</IconButton>
			{state.data ? (
				state.data.map((data) => {
					const date = new Date(data.createdOn);
					let step = null;
					switch (data.status) {
						case 'Pending':
							step = 0;
							break;
						case 'Confrimed':
							step = 1;
							break;
						case 'On the Way':
							step = 3;
							break;
						case 'Packing':
							step = 2;
							break;
						default:
							break;
					}

					if (data.status !== 'Delivered' && data.status !== 'Rejected') {
						return (
							<div>
								<Model data={data.order}>
									<Card raised className={classes.root}>
										<CardContent>
											<Stepper step={step} />
											<Typography className={classes.title} color="textSecondary" gutterBottom>
												{date.toLocaleDateString()}
											</Typography>
											<Typography className={classes.title} color="textSecondary" gutterBottom>
												{data.address}
											</Typography>
											<Typography className={classes.title} color="textSecondary" gutterBottom>
												{data.price + '₹ Paid via ' + data.payment.mode}
											</Typography>
											<Typography className={classes.title} color="textSecondary" gutterBottom>
												{data.order.length + ' Items from  ' + data.order[0].dealer_name}
											</Typography>
										</CardContent>
									</Card>
								</Model>
							</div>
						);
					} else {
						return null;
					}
				})
			) : (
				<div style={{ marginLeft: '50%' }}>
					<FadeLoader />
				</div>
			)}
		</div>
	);
}
