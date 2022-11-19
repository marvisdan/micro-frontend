import React, { useState } from "react";
import {
	Button,
	Checkbox,
	Container,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	TextField,
	Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { useStore } from "../store/useMarketingStore";

const useStyles = makeStyles((theme) => ({
	headerTextStyles: {
		textAlign: "center",
		marginBottom: theme.spacing(3)
	},
	textBoxStyles: {
		marginBottom: theme.spacing(1)
	},
	addButtonStyles: {
		marginBottom: theme.spacing(2)
	},
	completedTodoStyles: {
		textDecoration: "line-through"
	}
}));

const Todolist = () => {
	const {
		headerTextStyles,
		textBoxStyles,
		addButtonStyles,
		completedTodoStyles
	} = useStyles();
	const [todoText, setTodoText] = useState("");
	const { addTodo, removeTodo, toggleCompleted, todos } = useStore();

	return (
		<Container maxWidth="xs">
			<Typography variant="h3" className={headerTextStyles}>
				To-Do's
			</Typography>
			<TextField
				className={textBoxStyles}
				label="Todo Description"
				required
				variant="outlined"
				fullWidth
				onChange={(e) => setTodoText(e.target.value)}
				value={todoText}
			/>
			<Button
				className={addButtonStyles}
				fullWidth
				variant="outlined"
				color="primary"
				onClick={() => {
					if (todoText.length) {
						addTodo(todoText);
						setTodoText("");
					}
				}}>
				Add Item
			</Button>
			<List>
				{todos.map((todo) => (
					<ListItem key={todo.id}>
						<ListItemIcon>
							<Checkbox
								edge="start"
								checked={todo.completed}
								onChange={() => toggleCompleted(todo.id)}
							/>
						</ListItemIcon>
						<ListItemText
							className={todo.completed ? completedTodoStyles : ""}
							key={todo.id}>
							{todo.description}
						</ListItemText>
						<ListItemSecondaryAction>
							<IconButton
								onClick={() => {
									removeTodo(todo.id);
								}}>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</Container>
	);
};
export default Todolist;
