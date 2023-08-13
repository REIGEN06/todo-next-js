import axios from 'axios';

export const addTodoDb = (title: string): Promise<number> => {
	return axios
		.post(
			`http://${process.env.NEXT_PUBLIC_HOST}/api/task`,
			JSON.stringify({ title: title, done: false }),
			{
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			}
		)
		.then((res) => res.data);
};
