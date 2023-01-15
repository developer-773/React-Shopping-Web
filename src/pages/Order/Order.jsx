import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useCart } from "react-use-cart";

export default function Order() {
	const [order, setOrder] = useState([]);
	function createData(name, calories, fat, carbs, protein) {
		return { name, calories, fat, carbs, protein };
	}

	const rows = [
		createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
		createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
		createData("Eclair", 262, 16.0, 24, 6.0),
		createData("Cupcake", 305, 3.7, 67, 4.3),
		createData("Gingerbread", 356, 16.0, 49, 3.9),
	];

	const getOrders = () => {
		axios
			.get("http://localhost:8080/orders")
			.then((res) => setOrder(res.data))
			.catch((err) => {});
	};

	useEffect(() => {
		getOrders();
	}, []);

  const countries = ["Uzbekistan", "Tadjikistan", "Kazakhstan", "Turkmenistan", "Russia", "United Kingdom", "USA"]
	const orderPrices = order?.map((item, i) => item.totalPrice);

	const totalPrice = orderPrices.reduce((acc, value) => acc + value, 0);
	return (
		<Box sx={{display: "flex",padding: "11px"}}>
			<Box
				component="form"
				sx={{
					"& .MuiTextField-root": { m: 1, width: "400px" },
				}}
				noValidate
				autoComplete="off"
			>
				<Typography variant="h3">Billing details</Typography>

				<div>
					<TextField
						id="outlined-basic"
						label="First Name"
						placeholder="Adam"
            required
					/>
				</div>
				<div>
					<TextField id="outlined-basic" label="Last Name" placeholder="John" />
				</div>
				<div>
					<TextField id="outlined-basic" label="Company Name" />
				</div>
				<div>
					<TextField
						id="outlined-basic"
						label="Street Address"
						placeholder="House number and street name"
					/>
				</div>
				<div>
					<TextField id="outlined-basic" label="Town City" />
				</div>
				<div>
					<TextField id="outlined-basic" label="Country" select 
          >
           {countries.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          </TextField>
				</div>
				<div>
					<TextField id="outlined-basic" type={"number"} label="Phone" />
				</div>
				<div>
					<TextField id="outlined-basic" type={"email"} label="Email Address" />
				</div>
			</Box>
			<Box >
				<Typography variant="h4">Your Order</Typography>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 570, minHeight: 500 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell style={{ fontWeight: "600", fontSize: "17px" }}>
									Product
								</TableCell>
								<TableCell
									style={{ fontWeight: "600", fontSize: "17px" }}
									align="right"
								>
									Subtotal
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{order?.map((item) => (
								<>
									{item?.items?.map((subItem, i) => (
										<TableRow
											key={subItem?.product_name}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{subItem?.product_name}
											</TableCell>
											<TableCell align="right">
												{subItem.product_price} сум
											</TableCell>
										</TableRow>
									))}
								</>
							))}

							<TableRow >
								<TableCell sx={{fontWeight: "600", fontSize: "17px"}}>Total</TableCell>
								<TableCell sx={{textAlign: "right", fontWeight: "600", fontSize: "17px"}}>{totalPrice} сум</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
        <Button sx={{width: "100%",marginTop: "11px",  paddingY: "15px", paddingX: "10px"}} variant="contained" onClick={() => alert('Payment Successfully !!!')}>Process to Checkout</Button>
			</Box>
		</Box>
	);
}
