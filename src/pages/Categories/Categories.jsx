import {
	Button,
	DialogActions,
	DialogContent,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import Modal from "../../components/Modal/Modal";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Categories = () => {
	const [categoryModal, setCategoryModal] = useState(false);
	const [category, setCategory] = useState([]);
	const categoryRef = useRef();

	const getCategories = () => {
		axios
			.get("http://localhost:8080/category")
			.then((res) => setCategory(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getCategories();
	}, []);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.post("http://localhost:8080/category", {
				category_name: categoryRef.current.value,
			})
			.then((res) => {
				if (res.status === 201) {
					setCategoryModal(false);
					getCategories();
				}
			});
	};
	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:8080/category/${id}`)
			.then((res) => {
				getCategories();
			})
			.catch((err) => console.log(err));
	};

	return (
		<Box padding={"32px"}>
			<Button
				variant="contained"
				endIcon={<AddIcon />}
				onClick={() => setCategoryModal(true)}
			>
				Add Category
			</Button>

			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Category Name</TableCell>
							<TableCell>Category Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{category.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.id}</TableCell>
								<TableCell>{item.category_name}</TableCell>
								<TableCell>
									<Stack direction={"row"} spacing="2">
										<IconButton onClick={() => handleEdit(item.id)}>
											<EditIcon />
										</IconButton>
										<IconButton onClick={() => handleDelete(item.id)}>
											<DeleteIcon />
										</IconButton>
									</Stack>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Modal
				title={"Add category"}
				modal={categoryModal}
				setModal={setCategoryModal}
			>
				<form onSubmit={handleSubmit}>
					<DialogContent dividers>
						<TextField
							inputRef={categoryRef}
							sx={{ width: "505px" }}
							label="category name"
						/>
					</DialogContent>
					<DialogActions>
						<Button type="submit" variant="contained">
							Edit
						</Button>
					</DialogActions>
				</form>
			</Modal>
		</Box>
	);
};

export default Categories;
