import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	}
}));

function getSteps() {
	return [ { label: 'Confirmed' }, { label: 'Packing' }, { label: 'On the way' }, { label: 'Delivered' } ];
}

export default function HorizontalLabelPositionBelowStepper(props) {
	const classes = useStyles();
	const steps = getSteps();

	return (
		<div className={classes.root}>
			<Stepper activeStep={props.step} alternativeLabel>
				{steps.map((label) => (
					<Step key={label.label}>
						<StepLabel>{label.label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</div>
	);
}
