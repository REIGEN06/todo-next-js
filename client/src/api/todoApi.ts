import { Task } from '@/types/types';
import axios from 'axios';

export default async function fetcher<JSON = any>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	const res = await fetch(input, init);
	return res.json();
}

export const getTodosFromDb = (): Promise<Task[]> => {
	return axios.get('http://localhost:8080/api/tasks').then((res) => res.data);
};

export const addTodoDb = (title: string): Promise<number> => {
	return axios
		.post('http://localhost:8080/api/task', JSON.stringify({ title: title }), {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		})
		.then((res) => res.data);
};

export const deleteTodoDb = (id: number): void => {
	axios.delete(`http://localhost:8080/api/task/${id}`);
};

export const updateTodoDb = ({ id, title, done }: Task): void => {
	console.log(id, title, done);

	// axios({
	// 	method: 'put',
	// 	url: `http://localhost:8080/api/task/${id}`,
	// 	data: {
	// 		id: id,
	// 		title: title,
	// 		done: done,
	// 	},
	// });
};
