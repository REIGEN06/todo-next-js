import { create } from 'zustand';
import { Task } from '../../types/types';
import { nanoid } from 'nanoid';

interface TodosState {
	todos: Task[];
	addTodo: (title: string) => void;
	deleteTodo: (id: string) => void;
	doneTodo: (id: string) => void;
	editTodo: (id: string, newTitle: string) => void;
}

export const useTodos = create<TodosState>((set) => ({
	todos: [],

	addTodo: (title) => {
		set((state) => ({
			todos: [...state.todos, { id: nanoid(), title, done: false }],
		}));
	},

	deleteTodo: (id) =>
		set((state) => ({
			todos: state.todos.filter((todo) => {
				return todo.id !== id;
			}),
		})),

	doneTodo: (id) =>
		set((state) => ({
			todos: state.todos.map((todo) => {
				todo.id === id && (todo.done = !todo.done);
				return todo;
			}),
		})),

	editTodo: (id, newTitle) =>
		set((state) => ({
			todos: state.todos.map((todo) => {
				todo.id === id && (todo.title = newTitle);
				return todo;
			}),
		})),
}));
