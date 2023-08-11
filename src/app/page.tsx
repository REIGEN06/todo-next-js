'use client';
import {
	Autocomplete,
	Grid,
	IconButton,
	InputAdornment,
	ListSubheader,
	Stack,
	TextField,
	Theme,
	styled,
} from '@mui/material';
import { MutableRefObject, SyntheticEvent, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import TaskComponent from './components/TaskComponents';
import { Task } from './const/const';
import { useTodos } from './store/store';

const ToDoList = () => {
	const [searchInput, setSearchInput] = useState<string>('');
	const taskInputRef = useRef<HTMLInputElement>(null);

	const addTodo = useTodos((state) => state.addTodo);
	const deleteTodo = useTodos((state) => state.deleteTodo);
	const editTodo = useTodos((state) => state.editTodo);
	const todos = useTodos((state) => state.todos);

	const addTask = () => {
		if (!taskInputRef.current?.value) return;

		addTodo(taskInputRef.current.value);
		taskInputRef.current.value = '';
	};

	const onSearchBarChange = (value: string | null) => {
		setSearchInput(value || '');
	};

	const filteredTasks = todos?.filter((task: Task) => {
		return task.title?.toLowerCase().includes(searchInput.toLowerCase());
	});

	return (
		<StyledStack>
			<ListSubheader sx={{ p: 1 }}>
				<GridContainer container spacing={2}>
					<Grid item xs={12} sm={7}>
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
										<IconButton sx={{ padding: '0px' }} onClick={addTask}>
											<AddIcon />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Grid>

					<Grid item xs={12} sm={5}>
						<Autocomplete
							disablePortal
							options={todos.map((task: Task) => task.title).reverse()}
							onChange={(event, value) => onSearchBarChange(value)}
							sx={{
								marginBottom: 1,
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
				</GridContainer>
			</ListSubheader>

			{filteredTasks?.reverse().map((task: Task, id: number) => {
				return (
					<TaskComponent
						key={task.id}
						task={task}
						idInArray={todos.indexOf(task)}
						onDelete={() => deleteTodo(todos.indexOf(task))}
						onEdit={editTodo}
					/>
				);
			})}
		</StyledStack>
	);
};

export default ToDoList;

const GridContainer = styled(Grid)({
	display: 'flex',
	alignItems: 'center',
});

const StyledStack = styled(Stack)(({ theme }: { theme: Theme }) => ({
	margin: '24px 80px',
	padding: '8px',
	border: `1px solid ${theme.palette.border.main}`,
	borderRadius: '10px',
	backgroundColor: `${theme.palette.BackgroundColors.main}`,
}));

const InputProps = {};
