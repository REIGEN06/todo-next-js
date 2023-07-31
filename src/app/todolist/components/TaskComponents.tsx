import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Divider, IconButton, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { Task } from '../const/const';

type TaskComponentProps = {
	data: Task;
	idInArray: number;
	onDelete: () => void;
	onEdit: (id: number, newTitle: string) => void;
};

const TaskComponent = (props: TaskComponentProps) => {
	const [input, setInput] = useState<string>(props.data.title);
	const [edit, setEdit] = useState<boolean>(false);
	const editTask = () => {
		setEdit(!edit);
	};

	return (
		<Paper
			component="form"
			sx={{
				m: '16px 8px',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				{edit ? (
					<TextField
						label="Редактировать задачу"
						variant="outlined"
						multiline
						fullWidth
						inputProps={{ maxLength: 100 }}
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
				) : (
					<TextField
						variant="outlined"
						multiline
						fullWidth
						InputProps={{
							readOnly: true,
						}}
						value={props.data.title}
					/>
				)}

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					{edit ? (
						<IconButton
							sx={{ m: 1 }}
							onClick={() => props.onEdit(props.idInArray, input)}
						>
							<CheckIcon />
						</IconButton>
					) : (
						<IconButton sx={{ m: 1 }} onClick={() => editTask()}>
							<EditIcon />
						</IconButton>
					)}

					<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

					<IconButton sx={{ m: 1 }} onClick={props.onDelete}>
						<DeleteIcon />
					</IconButton>
				</Box>
			</Box>
		</Paper>
	);
};

export default TaskComponent;
