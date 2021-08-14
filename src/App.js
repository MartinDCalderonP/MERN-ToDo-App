import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import FormCard from './components/FormCard';
import TasksTable from './components/TasksTable';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function App() {
	const [flexDirection, setFlexDirection] = useState('row');
	const mid = useMediaQuery('(max-width:600px)');

	useEffect(() => {
		mid ? setFlexDirection('column') : setFlexDirection('row');
	}, [mid, setFlexDirection]);

	const useStyles = makeStyles(() => ({
		body: {
			display: 'flex',
			flexDirection: flexDirection,
			justifyContent: 'space-around',
			margin: '20px',
		},
	}));

	const classes = useStyles();

	const [refreshTasks, setRefreshTasks] = useState(0);
	const [getTask, setGetTask] = useState(null);

	const onRefreshTasks = () => {
		setRefreshTasks(refreshTasks + 1);
	};

	const onGetTask = (task) => {
		setGetTask(task);
	};

	return (
		<div className="App">
			<Header />
			<div className={classes.body}>
				<FormCard handleRefreshTasks={onRefreshTasks} getTask={getTask} />
				<TasksTable refreshTasks={refreshTasks} handleGetTask={onGetTask} />
			</div>
		</div>
	);
}
