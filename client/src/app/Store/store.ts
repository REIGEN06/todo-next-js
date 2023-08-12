import { create } from 'zustand';
import { Task } from '../todolist/const/const';
import { addTodoDb, deleteTodoDb, editTodoDb } from '../api/todoApi';
import axios from 'axios';

interface TodosState {
	todos: Task[];
	setTodosFromDb: () => void;
	addTodo: (title: string) => void;
	deleteTodo: (id: number, idInArray: number) => void;
	editTodo: (id: number, idInArray: number, newTitle: string) => void;
}

export const useTodos = create<TodosState>((set) => ({
	todos: [],
	setTodosFromDb: async () => {
		const tasks: Task[] = await axios
			.get('http://localhost:8080/api/tasks')
			.then((res) => res.data);

		set({
			todos: tasks,
		});
	},
	addTodo: async (title) => {
		const idFromDb = await addTodoDb(title);

		set((state) => ({
			todos: [...state.todos, { id: idFromDb, title }],
		}));
	},
	deleteTodo: (id, idInArray) => {
		deleteTodoDb(id);
		set((state) => {
			const newTasks = state.todos.slice();
			newTasks.splice(idInArray, 1);
			return { todos: newTasks };
		});
	},
	editTodo: (id, idInArray, newTitle) => {
		editTodoDb(id, newTitle);
		set((state) => {
			const newTasks = state.todos.slice();
			newTasks.splice(idInArray, 1, {
				id: id,
				title: newTitle,
			});
			return { todos: newTasks };
		});
	},
}));
