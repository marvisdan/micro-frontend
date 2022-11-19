import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Todo = {
	id: String;
	description: String;
	completed: boolean;
};

export type TodoState = {
	todos: Todo[];
	addTodo: (description: string) => void;
	removeTodo: (id: string) => void;
	toggleCompleted: (id: string) => void;
};

export const useStore = create<TodoState>()(
	devtools(
		persist(
			(set) => ({
				todos: [],
				addTodo: (description: string) => {
					set((state) => ({
						todos: [
							...state.todos,
							{
								id: String(Math.random() * 1000),
								description,
								completed: false
							}
						]
					}));
				},
				removeTodo: (id: string) => {
					set((state) => ({
						todos: state.todos.filter((t) => t.id !== id)
					}));
				},
				toggleCompleted: (id: string) => {
					set((state) => ({
						todos: state.todos.map((todo) => {
							if (todo.id === id) {
								todo = {
									...todo,
									completed: !todo.completed
								};
							}
							return todo;
						})
					}));
				}
			}),
			{
				name: "todo-storage", // name of item in the storage (must be unique)
				getStorage: () => sessionStorage // (optional) by default the 'localStorage' is used
			}
		)
	)
);
