import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import {
	Box,
	Divider,
	IconButton,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
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
		<div>
			{edit ? (
				<Paper
					component="form"
					sx={{
						m: '16px 8px',
						p: '0px 8px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<TextField
						label="Редактировать задачу"
						variant="outlined"
						multiline
						fullWidth
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<IconButton
							sx={{ m: 1 }}
							onClick={() => props.onEdit(props.idInArray, input)}
						>
							<CheckIcon />
						</IconButton>

						<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

						<IconButton sx={{ m: 1 }} onClick={props.onDelete}>
							<DeleteIcon />
						</IconButton>
					</Box>
				</Paper>
			) : (
				<Paper
					component="form"
					sx={{
						m: '16px 8px',
						p: '0px 8px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography sx={{ m: 1 }}>{props.data.title}</Typography>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<IconButton sx={{ m: 1 }} onClick={() => editTask()}>
							<EditIcon />
						</IconButton>

						<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

						<IconButton sx={{ m: 1 }} onClick={props.onDelete}>
							<DeleteIcon />
						</IconButton>
					</Box>
				</Paper>
			)}
		</div>
	);
};

export default TaskComponent;
