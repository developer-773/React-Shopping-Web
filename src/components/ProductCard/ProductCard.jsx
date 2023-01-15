import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	DialogActions,
	DialogContent,
	IconButton,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import Modal from "../Modal/Modal";
import { useCart } from 'react-use-cart';
import { positions } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";



export const UserProductCard = ({ item }) => {
	const { product_name, product_image, product_price } = item;
	const {addItem} = useCart()
	const {token} = useContext(AuthContext)
	const navigate = useNavigate()

	const handleAddProduct = () => {
		if(token) {
			addItem({...item, price: product_price})
		}else {
			navigate('/login')
		}
	}
	return (
		<Card sx={{width: "270px", height: "450px", position: "relative", padding: "15px"}}>
		<CardMedia
			sx={{width: "100%", maxWidth: "270px", height: "285px" }}
				image={product_image}
				title="green guana"
			></CardMedia>
			<CardContent>
				<Typography gutterBottom variant="h4" component={"h3"}>
					{product_name}
				</Typography>
				<Typography gutterBottom variant="body2" color={"text.secondary"}>
					От : {product_price} сум
				</Typography>
			</CardContent>
			<CardActions>
				<Button sx={{position: "absolute", bottom: "15px"}} onClick={() => handleAddProduct()} variant="contained" endIcon={<AddShoppingCartIcon />}>
					Add to cart
				</Button>
			</CardActions>
		</Card>
	);
};

export const AdminProductCard = ({ item }) => {
	const [editProduct, setEditProduct] = useState(false);
	const [category, setCategory] = React.useState([]);
	const [products, setProducts] = useState([]);
	const [value, setValue] = useState(1);
	const { product_name, product_image, product_price, id, category_id} = item;


	const nameRef = React.useRef("");
	const priceRef = React.useRef("");
	const imageRef = React.useRef("");
	const categoryRef = React.useRef("");

	const getProducts = () => {
		axios.get('http://localhost:8080/products').then(res => setProducts(res.data)).catch(err => console.log(err))
	}

	useEffect(() => {
		getProducts()
	},[])
	

	useEffect(() => {
		axios
			.get("http://localhost:8080/category")
			.then((res) => setCategory(res.data))
			.catch((err) => console.log(err));
	}, []);
	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.put(`http://localhost:8080/products/${id}`, {
				product_name: nameRef.current.value,
				product_price: priceRef.current.value,
				product_image: imageRef.current.value,
				category_id: categoryRef.current.value,
			})
			.then((res) =>{
				if(res.status === 200) {
					setEditProduct(false)
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
				<Card sx={{width: "270px", height: "450px", position: "relative", padding: "15px"}}>
		<CardMedia
			sx={{width: "100%", maxWidth: "270px", height: "285px" }}
					image={product_image}
					title="green guana"
				></CardMedia>
				<CardContent>
					<Typography gutterBottom variant="h4" component={"h3"}>
						{product_name}
					</Typography>
					<Typography marginTop={'25px'} gutterBottom variant="h4" color={'black'} component={'h5'} >
						От: {product_price} сум
					</Typography>
				</CardContent>
				<CardActions sx={{position: "absolute", bottom: "15px"}}>
					<Button
						variant="contained"
						endIcon={<Edit />}
						color="warning"
						onClick={() => setEditProduct(true)}
					>
						Edit
					</Button>
					<Button variant="contained" endIcon={<Delete />} color="error">
						Delete
					</Button>
				</CardActions>
			</Card>
			<Modal
				title={"Edit product"}
				modal={editProduct}
				setModal={setEditProduct}
			>
				<form onSubmit={handleSubmit}>
					<Stack spacing={2}>
						<DialogContent dividers>
							<TextField
								defaultValue={product_name}
								inputRef={nameRef}
								sx={{ width: "505px", marginBottom: "15px" }}
								label="Product name"
							/>
							<TextField
								inputRef={priceRef}
								defaultValue={product_price}
								sx={{ width: "505px", marginBottom: "15px" }}
								label="Product price"
							/>
							<TextField
								inputRef={imageRef}
								defaultValue={product_image}
								sx={{ width: "505px", marginBottom: "15px" }}
								label="Product image url"
							/>
							<TextField
								inputRef={categoryRef}
								sx={{ width: "505px", marginBottom: "15px" }}
								label="Product category"
								select
							>
								{category.map((item) => (
									<MenuItem value={item.id}>{item.category_name}</MenuItem>
								))}
							</TextField>
						</DialogContent>
						<DialogActions>
							<Button type="submit" variant="contained">
								Edit
							</Button>
						</DialogActions>
					</Stack>
				</form>
			</Modal>
		</>
	);
};
