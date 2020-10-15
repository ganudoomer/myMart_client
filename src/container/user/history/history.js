import React, { Fragment } from 'react';
import Layout from '../layout/layout';
import OrderHistory from '../../../components/user/Card';
import { Typography } from '@material-ui/core';

const History = (props) => {
	return (
		<Fragment>
			<Layout>
				<div style={{ width: '50px', marginLeft: '25%', marginTop: '2%' }}>
					<Typography> Order History</Typography>
					<OrderHistory />
				</div>
			</Layout>
		</Fragment>
	);
};

export default History;
