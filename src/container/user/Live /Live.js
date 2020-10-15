import React, { Fragment } from 'react';

import Typography from '@material-ui/core/Typography';

import LiveOrders from '../../../components/user/Live';
import Layout from '../layout/layout';

const Live = (props) => {
	return (
		<Fragment>
			<Layout>
				<div style={{ width: '50px', marginLeft: '25%', marginTop: '2%' }}>
					<Typography> Live Orders</Typography>
					<LiveOrders />
				</div>
			</Layout>
		</Fragment>
	);
};

export default Live;
