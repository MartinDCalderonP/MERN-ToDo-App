import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import FormCard from './components/FormCard';
import TasksTable from './components/TasksTable';

export default function App() {
	const useStyles = makeStyles(() => ({
		body: {
			display: 'flex',
			justifyContent: 'space-around',
			margin: '20px 20px 0px 0px',
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
