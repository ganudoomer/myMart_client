import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: 'auto',
		marginLeft: 125,
		minWidth: 300,
		[theme.breakpoints.down('sm')]: {
			marginLeft: 25
		}
	},
	button: {
		marginLeft: 20
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	icon: {
		marginRight: theme.spacing(2)
	},
	heroContent: {
		backgroundImage: 'linear-gradient(180deg, #5b5b5b 0%, #e3d9d9 50%, #ffffff 100%)',
		padding: theme.spacing(8, 0, 6)
	},
	heroContentMarket: {
		padding: theme.spacing(8, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	cardMedia: {
		cursor: 'pointer',
		paddingTop: '56.25%' // 16:9
	},
	cardContent: {
		cursor: 'pointer',
		flexGrow: 1
	},
	footer: {
		backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
		padding: theme.spacing(6)
	},
	nav: {
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	revNav: {
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},

	large: {
		width: 100,
		height: 100,
		marginTop: 10,
		margin: 'auto'
	}
}));
