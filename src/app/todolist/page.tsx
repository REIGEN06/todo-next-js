'use client';
import {
	Autocomplete,
	Container,
	Grid,
	IconButton,
	InputAdornment,
	List,
	ListSubheader,
	TextField,
	useTheme,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import TaskComponent from './components/TaskComponents';
import { Task } from './const/const';
import { useTodos } from '../Store/store';

const ToDoList = () => {
	const [searchInput, setsearchInput] = useState<string>('');
	const [tasks, setTasks] = useState<Task[]>([]);
	const [input, setInput] = useState<string>('');
	const theme = useTheme();

	const addTodo = useTodos((state: any) => state.addTodo);
	const deleteTodo = useTodos((state: any) => state.deleteTodo);
	const editTodo = useTodos((state: any) => state.editTodo);
	const todos = useTodos((state: any) => state.todos);

	const addTask = () => {
		if (input.length === 0) return;
		addTodo(input);
	};

	const deleteTask = (id: number) => {
		deleteTodo(id);
	};

	const editTask = (id: number, newTitle: string) => {
		editTodo(id, newTitle);
	};

	const onSearchBarChange = (
		event: SyntheticEvent<Element, Event>,
		value: string | null
	) => {
		setsearchInput(value || '');
	};
	const onAddTask = () => {
		addTask();
		setInput('');
	};

	let filteredTasks = todos?.filter((task: any) => {
		return task.title?.toLowerCase().includes(searchInput.toLowerCase());
	});

	return (
		<Container
			maxWidth="md"
			sx={{
				p: 3,
				marginTop: 3,
				border: `1px solid ${theme.palette.border.main}`,
				borderRadius: '10px',
				backgroundColor: `${theme.palette.BGcolors.main}`,
			}}
		>
			<List subheader={<li />}>
				<ListSubheader sx={{ p: 1 }}>
					<Grid
						container
						spacing={2}
						sx={{ display: 'flex', alignItems: 'center' }}
					>
						<Grid item xs={7}>
							<TextField
								type="text"
								label="Добавить таск"
								variant="outlined"
								fullWidth
								autoFocus
								onKeyDown={(e) => {
									if (e.key == 'Enter') onAddTask();
								}}
								value={input}
								onChange={(e) => setInput(e.target.value)}
								inputProps={{ maxLength: 100 }}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												sx={{ padding: '0px' }}
												onClick={() => onAddTask()}
											>
												<AddIcon />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={5}>
							<Autocomplete
								disablePortal
								options={tasks.map((option) => option.title)}
								onChange={onSearchBarChange}
								sx={{
									margin: '0px 0px 8px',
								}}
								fullWidth
								renderInput={(params) => (
									<TextField
										margin="normal"
										{...params}
										label="Поиск по списку"
									/>
								)}
								renderOption={(props, option) => {
									return (
										<li {...props} key={props.id}>
											{option}
										</li>
									);
								}}
							/>
						</Grid>
					</Grid>
				</ListSubheader>

				{filteredTasks
					?.map((task: Task, id: number) => {
						return (
							<TaskComponent
								key={task.id}
								data={task}
								idInArray={id}
								onDelete={() => deleteTask(id)}
								onEdit={editTask}
							/>
						);
					})
					.reverse()}
			</List>
		</Container>
	);
};

export default ToDoList;
