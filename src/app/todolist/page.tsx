'use client';
import Link from 'next/link';
import { useState } from 'react';

type Task = {
	id: string;
	title: string;
};
export default function ToDoList() {
	const [searchInput, setsearchInput] = useState<string>('');
	const [tasks, setTasks] = useState<Task[]>([]);
	const [input, setInput] = useState<string>('TestTask');

	const addTask = () => {
		const uuid = crypto.randomUUID();
		setTasks([...tasks, { id: uuid, title: input }]);
	};

	const deleteTask = (id: number) => {
		setTasks((currentTasks) => {
			const newTasks = currentTasks.slice();
			newTasks.splice(id, 1);
			return newTasks;
		});
	};

	const editTask = (id: number, newTitle: string) => {
		const uuid = crypto.randomUUID();
		setTasks((currentTasks) => {
			const newTasks = currentTasks.slice();
			newTasks.splice(id, 1, { id: uuid, title: newTitle });
			return newTasks;
		});
	};

	const filteredTasks = tasks?.filter((task) => {
		return task.title?.toLowerCase().includes(searchInput.toLowerCase());
	});

	return (
		<div>
			<Link href="/">
				<button>Go Home</button>
			</Link>

			<div>ToDo List Page</div>

			<div>
				<input
					placeholder="Поиск таска по названию"
					onChange={(e) => setsearchInput(e.target.value)}
				/>
			</div>

			<input
				placeholder="Введите название таска"
				onChange={(e) => setInput(e.target.value)}
			/>

			<button onClick={() => addTask()}>Добавить</button>

			{filteredTasks?.map((task: Task, id: number) => {
				return (
					<TaskComponent
						key={task.id}
						data={task}
						idInArray={id}
						onDelete={() => deleteTask(id)}
						onEdit={editTask}
					/>
				);
			})}
		</div>
	);
}

const TaskComponent = (props: TaskComponentProps) => {
	const [input, setInput] = useState<string>(props.data.title);
	const [edit, setEdit] = useState<boolean>(false);
	const editTask = () => {
		setEdit(!edit);
	};

	return (
		<div>
			{edit ? (
				<div>
					<input onChange={(e) => setInput(e.target.value)} value={input} />
					<button onClick={() => props.onEdit(props.idInArray, input)}>
						Ok
					</button>
				</div>
			) : (
				<div>
					{props.data.title}
					<button onClick={props.onDelete}>Del</button>
					<button onClick={() => editTask()}>Edit</button>
				</div>
			)}
		</div>
	);
};

type TaskComponentProps = {
	data: Task;
	idInArray: number;
	onDelete: () => void;
	onEdit: (id: number, newTitle: string) => void;
};
