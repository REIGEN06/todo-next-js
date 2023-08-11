import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import {
	Box,
	Divider,
	IconButton,
	Paper,
	TextField,
	styled,
} from '@mui/material';
import { useState } from 'react';
import { Task } from '../const/const';

interface TaskComponentProps {
	data: Task;
	idInArray: number;
	onDelete: () => void;
	onEdit: (id: number, newTitle: string) => void;
}

const TaskComponent = (props: TaskComponentProps) => {
	const [input, setInput] = useState<string>(props.data.title);
	const [edit, setEdit] = useState<boolean>(false);

	const editTask = () => {
		props.onEdit(props.idInArray, input);
		setEdit(!edit);
	};

	return (
		<WrapperTask>
			<WrapperBox>
				{edit ? (
					<TextField
						label="Редактировать задачу"
						variant="standard"
						multiline
						fullWidth
						InputProps={InputProps}
						inputProps={{ maxLength: 100 }}
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
				) : (
					<TextField
						variant="standard"
						multiline
						fullWidth
						InputProps={InputPropsReadOnly}
						value={props.data.title + ' ------ id: ' + props.idInArray}
					/>
				)}

				<WrapperBox>
					{edit ? (
						<IconButton sx={{ m: 1 }} onClick={() => editTask()}>
							<CheckIcon />
						</IconButton>
					) : (
						<IconButton sx={{ m: 1 }} onClick={() => setEdit(!edit)}>
							<EditIcon />
						</IconButton>
					)}

					<Divider sx={{ height: 28, p: '4px' }} orientation="vertical" />

					<IconButton sx={{ m: 1 }} onClick={props.onDelete}>
						<DeleteIcon />
					</IconButton>
				</WrapperBox>
			</WrapperBox>
		</WrapperTask>
	);
};

export default TaskComponent;

const InputProps = {
	disableUnderline: true,
};

const InputPropsReadOnly = {
	readOnly: true,
	disableUnderline: true,
};

const WrapperTask = styled(Paper)({
	margin: '16px 8px',
});

const WrapperBox = styled(Box)({
	display: 'flex',
	alignItems: 'center',
});
