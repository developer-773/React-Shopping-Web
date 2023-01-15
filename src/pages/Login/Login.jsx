import React, { useContext, useState } from "react";
import {
  Button,
	InputAdornment,
	MenuItem,
    Link,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";

export const Login = () => {
  const [inputType, setInputType] = useState(false);
  
  const schema = Yup.object({
   
    email: Yup.string().email("Invalid format").required("Required"),
    password: Yup.string().min(3, '3ta').max(8, '8ta').required('Required'),
  })

  const {register,handleSubmit, formState, formState: {errors, isValid}} = useForm({mode: 'onBlur',defaultValues: {
  
    email: '',
    password: '',
  },
resolver: yupResolver(schema)});

const {setToken} = useContext(AuthContext)
const {setUser} = useContext(UserContext)


const onSubmit = (data) => {
  axios.post("http://localhost:8080/login", data).then(data => {
    if(data.status === 200) {
      setToken(data.data.accessToken)
      setUser(data.data.user)
    }
  })
}

	return (
		<Paper
			sx={{ width: "100%", maxWidth: "555px", marginX: "auto", marginTop: "5rem", padding: "32px" }}
		>
			<Typography variant="h4" component="h2" textAlign="center" gutterBottom>
				Login
			</Typography>
            <Typography variant="body2" textAlign={'center'} X>Sizda account yo'qmi ? <Link  component={RouterLink} to="/login">Register</Link></Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2} marginBottom="11px">
					<TextField type="email" label=" Email" helperText={errors.email?.message} {...register("email")} />
					<TextField
						type={inputType ? "text" : "password"}
						label=" Password"
            helperText={errors.password?.message}
            {...register("password")}
						InputProps={{
							endAdornment: (
								<InputAdornment
									onClick={() => setInputType(!inputType)}
									position="end"
								>
									<VisibilityIcon cursor="pointer" />
								</InputAdornment>
							),
						}}
					/>
				</Stack>
        <Button disabled={!isValid} type='submit' variant="contained">Submit</Button>
			</form>
		</Paper>
	);
};
