import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";

import { useStore } from "../store/useAuthStore";
import { useEffect } from "react";

function getStorageValue(key, defaultValue) {
	// getting stored value
	const saved = localStorage.getItem(key);
	const initial = JSON.parse(saved);
	return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
	const [value, setValue] = useState(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		// storing input name
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" to="/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	"@global": {
		a: {
			textDecoration: "none"
		}
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: theme.palette.background,
		maxWidth: "40%"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	light: {
		backgroundColor: "#fff"
	},
	dark: {
		backgroundColor: "#000"
	}
}));

export default function SignIn({ onSignIn, theme, mode }) {
	const classes = useStyles();
	const { darkmode } = useStore();
	console.log("SIGNIN MODE PROPS DRILL", mode, theme, theme.palette.type);
	useLocalStorage("darkmode-storage", "light");
	return (
		<Box
			className={mode === "light" ? classes.light : classes.dark}
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center">
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form
					onSubmit={(e) => e.preventDefault()}
					className={classes.form}
					noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={onSignIn}>
						Sign In
					</Button>
					<Grid container>
						<Grid item>
							<Link to="/auth/signup">{"Don't have an account? Sign Up"}</Link>
						</Grid>
					</Grid>
				</form>
			</Paper>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Box>
	);
}
