import axios from 'axios';

export const addTodoDb = (title: string): Promise<number> => {
	return axios
		.post(
			'http://localhost:8080/api/task',
			JSON.stringify({ title: title, done: false }),
			{
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			}
		)
		.then((res) => res.data);
};
