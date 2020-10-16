import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
	const [ open ] = React.useState(props.view);

	const handleClose = () => {
		props.onCloseHandler();
	};
	const [ otp, setOtp ] = useState({ otp: '' });
	const onSubmitHandler = (e) => {
		props.onAdSubmitHandler(otp.otp);
		handleClose();
	};
	const onOtp = (e) => {
		setOtp({
			otp: e.target.value
		});
	};
	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Enter new address</DialogTitle>

				<DialogContent>
					<TextField
						value={otp.otp}
						onChange={onOtp}
						autoFocus
						margin="dense"
						id="name"
						label="Address"
						type="text"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" onClick={onSubmitHandler} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
