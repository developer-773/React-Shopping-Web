import React, { useContext, useState } from "react";
import {
  Button,
	InputAdornment,
	MenuItem,
	Paper,
	Link,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export const Register = () => {
  const [inputType, setInputType] = useState(false);
  
  const schema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid format").required("Required"),
    password: Yup.string().min(3, '3ta').max(8, '8ta').required('Required'),
    gender: Yup.string().required('Required')
  })

  const {register,handleSubmit, formState, formState: {errors, isValid}} = useForm({mode: 'onBlur',defaultValues: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    gender: ''
  },
resolver: yupResolver(schema)});

const {setToken} = useContext(AuthContext)
const {setUser} = useContext(UserContext)
const navigate = useNavigate()


const onSubmit = (data) => {
  axios.post("http://localhost:8080/register", data)
  .then(data => {
    if(data.status === 201) {
      setToken(data.data.accessToken)
      setUser(data.data.user)
	  navigate('/')
    }
  })
  .catch(err => console.log(err))
}

	return (
		<Paper
			sx={{ width: "100%", maxWidth: "555px", marginX: "auto", marginTop: "5rem", padding: "32px" }}
		>
			<Typography variant="h4" component="h2" textAlign="center" >
				Register
			</Typography>
			<Typography display={'inline-block'} marginBottom={'21px'} variant="body2" textAlign={'center'}>Sizda account bormi ? <Link  component={RouterLink} to="/login">Login</Link></Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2} marginBottom="11px">
					<TextField label="First name" {...register("first_name")}  helperText={errors.first_name?.message}/>
					<TextField label="Last name" helperText={errors.last_name?.message} {...register("last_name")}/>
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
					<TextField select label="Gender" defaultValue={""} helperText={errors.gender?.message} {...register("gender")}>
							<MenuItem value={"male"}>Male</MenuItem>
							<MenuItem value={"female"}>Female</MenuItem>
					</TextField>
				</Stack>
        <Button disabled={!isValid} type='submit' variant="contained">Submit</Button>
			</form>
		</Paper>
	);
};
