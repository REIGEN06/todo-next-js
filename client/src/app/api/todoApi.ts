import axios from 'axios';

export const addTodoDb = (id: string, title: string): void => {
	axios.post(
		'http://localhost:8080/api/task',
		JSON.stringify({ nanoid: id, title: title }),
		{
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}
	);
};
