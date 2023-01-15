import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import {
	Button,
	DialogActions,
	DialogContent,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import { Stack } from "@mui/system";
import { AdminProductCard } from "../../components/ProductCard/ProductCard";

export default function Products() {
	const [category, setCategory] = React.useState([]);
	const [productModal, setProductModal] = React.useState(false);
  const [products, setProducts] = React.useState([])
	const [value, setValue] = React.useState(1);

	const nameRef = React.useRef("");
	const priceRef = React.useRef("");
	const imageRef = React.useRef("");
	const categoryRef = React.useRef("");

	const handleChange = (evt) => {
		setValue(+evt.target.attributes.tabIndex.nodeValue);
	};

	React.useEffect(() => {
		axios
			.get("http://localhost:8080/category")
			.then((res) => setCategory(res.data))
			.catch((err) => console.log(err));
	}, []);

  const getProducts = async (id) => {
    axios.get('http://localhost:8080/products?category_id=' + id).then(res => setProducts(res.data)).catch(err => console.log(err))

  }

  React.useEffect(() => {
    getProducts(value)
  },[value])

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.post("http://localhost:8080/products", {
				product_name: nameRef.current.value,
				product_price: priceRef.current.value,
				product_image: imageRef.current.value,
				category_id: categoryRef.current.value,
			})
			.then((res) => {
				if(res.status === 201) {
					setProductModal(false)
					getProducts(value)
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<Box padding={"32px"}>
			<Button
				variant="contained"
				endIcon={<AddIcon />}
				onClick={() => setProductModal(true)}
			>
				Add Product
			</Button>
			<Box sx={{  }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						{category?.map((category) => (
							<Tab
								key={category.id}
                value={category.id}
								tabIndex={category.id}
								label={category.category_name}
								simple-tab={category.id}
							/>
						))}
					</Tabs>
				</Box>
              {category.map(item => (
                <Box sx={{margin: "25px"}}  role='tabpanel' hidden={value !== item.id} value={value} index={item.id}>
					<Grid container spacing={3}>
                  {products.map(item => (
						<Grid item sx={3}>
						<AdminProductCard item={item} key={item.id+1} />
					</Grid>
                  ))}
				  </Grid>
                </Box>
              ))}
			</Box>

			<Modal
				title={"Add product"}
				modal={productModal}
				setModal={setProductModal}
			>
				<form onSubmit={handleSubmit}>
					<Stack spacing={2}>
						<DialogContent dividers>
							<TextField
								inputRef={nameRef}
								sx={{ width: "505px", marginBottom: "15px" }}
								label="Product name"
							/>
							<TextField
								inputRef={priceRef}
								sx={{ width: "505px", marginBottom: "15px" }}
								label="Product price"
							/>
							<TextField
								inputRef={imageRef}
								sx={{ width: "505px", marginBottom: "15px" }}
								label="Product image url"
							/>
							<TextField
								inputRef={categoryRef}
								sx={{ width: "505px", marginBottom: "15px" }}
								label="Product category"
								select
								value={value}
							>
								{category.map((item) => (
									<MenuItem value={item.id}>{item.category_name}</MenuItem>
								))}
							</TextField>
						</DialogContent>
						<DialogActions>
							<Button type="submit" variant="contained">
								Add
							</Button>
						</DialogActions>
					</Stack>
				</form>
			</Modal>
		</Box>
	);
}
