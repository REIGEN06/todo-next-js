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
import {
	MutableRefObject,
	SyntheticEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import AddIcon from '@mui/icons-material/Add';
import TaskComponent from './components/TaskComponents';
import { Task } from './const/const';
import { useTodos } from '../Store/store';

const ToDoList = () => {
	const [searchInput, setSearchInput] = useState<string>('');
	const taskInputRef = useRef() as MutableRefObject<HTMLInputElement>;
	const theme = useTheme();

	const setTodosFromDb = useTodos((state) => state.setTodosFromDb);
	const addTodo = useTodos((state) => state.addTodo);
	const deleteTodo = useTodos((state) => state.deleteTodo);
	const editTodo = useTodos((state) => state.editTodo);
	const todos = useTodos((state) => state.todos);

	useEffect(() => {
		setTodosFromDb();
	}, []);

	const addTask = () => {
		if (taskInputRef.current.value !== undefined)
			addTodo(taskInputRef.current.value);
		taskInputRef.current.value = '';
	};

	const deleteTask = (id: number, idInArray: number) => {
		deleteTodo(id, idInArray);
	};

	const editTask = (id: number, idInArray: number, newTitle: string) => {
		editTodo(id, idInArray, newTitle);
	};

	//Если пользователь вводит что-то в поиск
	const onSearchBarChange = (
		event: SyntheticEvent<Element, Event>,
		value: string | null
	) => {
		setSearchInput(value || '');
	};

	const filteredTasks = todos.filter((task: Task) => {
		return task.title.toLowerCase().includes(searchInput.toLowerCase());
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
								inputRef={taskInputRef}
								onKeyDown={(e) => e.key === 'Enter' && addTask()}
								inputProps={{ maxLength: 100 }}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												sx={{ padding: '0px' }}
												onClick={() => addTask()}
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
								options={todos.map((task: Task) => task.title).reverse()}
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
					?.map((task: Task, idInArray: number) => {
						return (
							<TaskComponent
								key={task.id}
								data={task}
								idInArray={idInArray}
								onDelete={() => deleteTask(task.id, idInArray)}
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
