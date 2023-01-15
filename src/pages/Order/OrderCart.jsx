import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/system";
import { Button } from "@mui/material";
import { useCart } from "react-use-cart";

export default function OrderCart({ item }) {
    const {product_price, product_image, product_name, id, quantity} = item
    const {updateItemQuantity, removeItem, cartTotal} = useCart()
    return (
		<>
			<ListItem >
				<ListItemAvatar>
					<Avatar src={product_image} alt={product_name} />
				</ListItemAvatar>

				<ListItemText primary={product_name} secondary={`${product_price} сум`}/>
					<Box sx={{display: "flex", width: "220px"}}>
						<Button onClick={() => updateItemQuantity(id, quantity + 1)} variant="contained" sx={{ backgroundColor: "silver" }}>
							+
						</Button>
						<Typography sx={{ marginX: "15px" }} variant="h4">
							{quantity}
						</Typography>
						<Button onClick={() => updateItemQuantity(id, quantity - 1)} variant="contained" sx={{ backgroundColor: "silver", marginRight: "11px" }}>
							-
						</Button>
						<Button
							variant="contained"
							color="error"
							// sx={{ marginLeft: "10px" }}
                            onClick={() => removeItem(id)}
						>
							Remove
						</Button>
					</Box>
			</ListItem>
			<Divider variant="inset" component="li" />
		</>
	);
}
