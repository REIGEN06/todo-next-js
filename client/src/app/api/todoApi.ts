import axios from 'axios';
export default async function fetcher<JSON = any>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	const res = await fetch(input, init);
	return res.json();
}

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

export const editTodoDb = (id: number, newTitle: string): void => {
	axios.put(
		`http://localhost:8080/api/task/${id}`,
		JSON.stringify({ title: newTitle }),
		{
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}
	);
};
