import { create } from 'zustand';
import { Task } from '../todolist/const/const';
import { nanoid } from 'nanoid';
export const useTodos = create((set) => ({
	todos: [],
	addTodo: (title: string) =>
		set((state: any) => ({
			todos: [...state.todos, { id: nanoid(), title }],
		})),
	deleteTodo: (id: string) => {
		set((state: any) => {
			const newTasks = state.todos.slice();
			newTasks.splice(id, 1);
			return { todos: newTasks };
		});
	},
	editTodo: (id: string, newTitle: string) => {
		set((state: any) => {
			const newTasks = state.todos.slice();
			newTasks.splice(id, 1, { id: newTasks[id].id, title: newTitle });
			return { todos: newTasks };
		});
	},
}));

//ref
