import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
		<BrowserRouter>
			<AuthProvider>
				<UserProvider>
					<CartProvider>
					<App />
					</CartProvider>
				</UserProvider>
			</AuthProvider>
		</BrowserRouter>
);
