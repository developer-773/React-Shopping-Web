import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserContext } from "../../context/UserContext";
import { Badge, Drawer, Grid, List, Tab, Tabs } from "@mui/material";
import { Link, Link as LinkRouter } from "react-router-dom";
import { UserProductCard } from "../../components/ProductCard/ProductCard";
import axios from "axios";
import { useCart } from "react-use-cart";
import { Stack } from "@mui/system";
import OrderCart from "../Order/OrderCart";
import Modal from "../../components/Modal/Modal";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from "../../context/AuthContext";







export const Client = () => {
	const { totalUniqueItems, isEmpty, emptyCart, items, cartTotal, id } = useCart();
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const { user, setUser } = React.useContext(UserContext);
  const {token, setToken} = React.useContext(AuthContext)
	const [products, setProducts] = React.useState([]);

	const [drawer, setDrawer] = React.useState(false);
  const [orderModal, setOrderModal] = React.useState(false)


	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};


	React.useEffect(() => {
		axios
			.get("http://localhost:8080/products")
			.then((res) => setProducts(res.data))
			.catch((err) => {});
	}, []);




  const handleOrder = () => {
    axios.post('http://localhost:8080/orders', {
      user_id: user.id,
      user_name: user.first_name,
      user_email: user.email,
      items: items,
      totalPrice: cartTotal
    }).then(res => {}).catch(err => {})


    alert(`
      Successfully !!!
      user_name: ${user?.first_name},
      user_email: ${user?.email},
      Products: ${items?.[0]?.product_name},
      totalPrice: ${cartTotal} сум
    `)
    setOrderModal(false)
    setDrawer(false)
    emptyCart(id)
  }

  const closeDrawer = () => {
    setDrawer(false)
    emptyCart()
  }

	return (
		<>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							LOGO
						</Typography>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginLeft: "auto",
								width: "180px",
							}}
						>
							<Button
								variant="contained"
								component={LinkRouter}
								to="/login"
								color="success"
							>
								Login
							</Button>
							<Badge badgeContent={totalUniqueItems} color="success">
								<IconButton
									sx={{ backgroundColor: "silver" }}
									onClick={() => setDrawer(true)}
								>
									<ShoppingCartIcon />
								</IconButton>
							</Badge>
							<Drawer
								anchor="right"
								open={drawer}
								onClose={() => setDrawer(false)}
							>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										width: "530px",
										height: "100%",
									}}
								>
									<Stack sx={{ flexGrow: "1" }}>
                    <List sx={{width: "100%", maxWidth: "480px",  padding: "21px",  bgcolor: 'background.paper' }}>
                      <Typography width={'100%'} fontSize={'26px'} marginBottom={'20px'} paddingBottom={'20px'} fontWeight={'600'} borderBottom={'1px solid silver'}>Cart review</Typography>
                      {isEmpty ? <Typography variant="h4"> Cart is empty</Typography> : ""}
                      {items?.map((item, i) => (
                        <OrderCart key={i} item={item}/>
                      ))}
                    </List>
									</Stack>
                  <Box sx={{margin: "21px"}}>
                  <Typography variant="h4">Всего: {cartTotal} сум</Typography>
                  </Box>
									<Stack spacing={2} direction="row" marginX={'auto'}> 
										<Button
											variant="contained"
											color="error"
											onClick={() => closeDrawer()}
										>
											Clear
										</Button>
										<Button disabled={isEmpty} variant="contained" color="success" onClick={() => setOrderModal(true)}>
											Checkout
										</Button>
									</Stack>
								</Box>
							</Drawer>

							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open settings">
									<IconButton
										onClick={handleOpenUserMenu}
										sx={{ backgroundColor: "silver" }}
									>
										{token ? (
											<Avatar>
												{`${user?.first_name.charAt(
													0
												)} ${user?.last_name.charAt(0)}`}
											</Avatar>
										) : (
											"BK"
										)}
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
                  <MenuItem>
                  <LinkRouter  style={{textDecoration: "none", fontSize: "13px", color: "#000", fontWeight: "600"}} to={'/admin'}>Admin</LinkRouter>
                  </MenuItem>
                  <MenuItem>
                  <LinkRouter  style={{textDecoration: "none", fontSize: "13px", color: "#000", fontWeight: "600"}} onClick={() => {setToken(''), setUser('')}} to={'/login'}>Log Out</LinkRouter>
                  </MenuItem>
								</Menu>
							</Box>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			<Box sx={{ paddingTop: "4rem" }}>
				<Container>
					<Grid container spacing={4}>
						{products?.map((product) => (
							<Grid item xs={4}>
								<UserProductCard key={product.id} item={product} />
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>
      <Modal title={'Are you sure?'} modal={orderModal} setModal={setOrderModal}>
              <Stack padding={'20px'} direction={'row'} spacing={3}>
                <Button variant="outlined" color="error" endIcon={<CloseIcon />} onClick={() => {setOrderModal(false), setDrawer(false)}}>No</Button>
                <Button  variant="outlined" color="success" endIcon={<DoneIcon />} onClick={() => handleOrder()}>Yes</Button>
              </Stack>
      </Modal>
		</>
	);
};
