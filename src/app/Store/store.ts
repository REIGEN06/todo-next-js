import { create } from 'zustand';
import { Task } from '../const/const';
import { nanoid } from 'nanoid';

interface TodosState {
	todos: Task[];
	addTodo: (title: string) => void;
	deleteTodo: (id: string) => void;
	editTodo: (id: string, newTitle: string) => void;
}

export const useTodos = create<TodosState>((set) => ({
	todos: [],

	addTodo: (title) => {
		set((state) => ({
			todos: [...state.todos, { id: nanoid(), title }],
		}));
	},

	deleteTodo: (id) => {
		set((state) => ({
			todos: state.todos.filter((todo) => {
				return todo.id !== id;
			}),
		}));
	},

	editTodo: (id, newTitle) =>
		set((state) => ({
			todos: state.todos.map((todo) => {
				todo.id === id && (todo.title = newTitle);
				return todo;
			}),
		})),
}));
