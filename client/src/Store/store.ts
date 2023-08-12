// @ts-nocheck
import { create } from 'zustand';
import { Task } from '../types/types';
import { addTodoDb, deleteTodoDb, editTodoDb } from '@/api/todoApi';
import axios from 'axios';

interface TodosState {
	todos: Task[];
	getTodosFromDbAndSet: () => void;
	addTodo: (title: string) => void;
	deleteTodo: (id: number) => void;
	doneTodo: (id: number) => void;
	editTodo: (id: number, newTitle: string) => void;
}

export const useTodos = create<TodosState>((set) => ({
	todos: [],

	getTodosFromDbAndSet: async () => {
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
			todos: [...state.todos, { id: idFromDb, title, done: false }],
		}));
	},

	deleteTodo: async (id) => {
		await deleteTodoDb(id);

		set((state) => ({
			todos: state.todos.filter((todo) => {
				return todo.id !== id;
			}),
		}));
	},

	editTodo: async (id, newTitle) => {
		await editTodoDb(id, newTitle);

		set((state) => ({
			todos: state.todos.map((todo) => {
				todo.id === id && (todo.title = newTitle);
				return todo;
			}),
		}));
	},

	doneTodo: (id) =>
		set((state) => ({
			todos: state.todos.map((todo) => {
				todo.id === id && (todo.done = !todo.done);
				return todo;
			}),
		})),
}));
