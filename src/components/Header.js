import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default function Header() {
	const useStyles = makeStyles((theme) => ({
		toolBar: {
			justifyContent: 'center'
		}
	}));
	
    const classes = useStyles();

	return (
		<div>
			<AppBar position="static">
				<Toolbar className={classes.toolBar}>
					<Typography variant="h6">MERN ToDo App</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}
