import { Task } from '@/types/types';
import axios from 'axios';

export const getTodosFromDb = (): Promise<Task[]> => {
	return axios
		.get(`http://${process.env.NEXT_PUBLIC_HOST}/api/tasks`)
		.then((res) => res.data);
};
