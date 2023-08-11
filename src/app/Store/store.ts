import { create } from 'zustand';
import { Task } from '../const/const';
import { nanoid } from 'nanoid';

interface TodosState {
	todos: Task[];
	addTodo: (title: string) => void;
	deleteTodo: (id: number) => void;
	editTodo: (id: number, newTitle: string) => void;
}

export const useTodos = create<TodosState>((set) => ({
	todos: [],

	addTodo: (title) =>
		set((state) => ({
			todos: [...state.todos, { id: nanoid(), title }],
		})),

	deleteTodo: (id) => {
		set((state) => {
			const newTasks = state.todos.slice();
			newTasks.splice(id, 1);
			return { todos: newTasks };
		});
	},

	editTodo: (id, newTitle) => {
		set((state) => {
			const newTasks = state.todos.slice();
			newTasks.splice(id, 1, { id: newTasks[id].id, title: newTitle });
			return { todos: newTasks };
		});
	},
}));
