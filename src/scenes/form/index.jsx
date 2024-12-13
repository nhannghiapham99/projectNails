import { Box, Button, TextField, useColorScheme } from "@mui/material";
import { Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "../../Components/Header";
import { useEffect, useState } from "react";
import { API_URL } from "../../theme";

const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber:"",
    email: "",
    position: "",
    hireDate: "",
}

const phoneRegExp =
/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    phoneNumber: yup
    .string()
    .matches(phoneRegExp,"Phone number not valid")
    .required("required"),
    email: yup.string().email("invalid email").required("required"),
    position: yup.string().required("required"),
    hireDate: yup.date().required("required date is YYYY-MM-DD ").nullable()
})

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [inputData, setInputData] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (values) => {  
        
        console.log(values);   
        
        try {
            const token = localStorage.getItem('jwtToken');
            console.log(token);
            const response = await fetch(`${API_URL}/Staff`,{
            method:"POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', // Ensure the Content-Type is set to application/json
            },
            body:JSON.stringify(values)
        }).then(() => {
            console.log('new Staff created');
            alert('new Staff created'); 
        });
        if (response.ok) {
            // If the response status is in the range 200-299 (success)
            const data = await response.json();
            setMessage('Data submitted successfully!');
            setMessageType('success');
          } else {
            // If the response status is not in the range 200-299 (error)
            setMessage('Failed to submit data. Please try again.');
            setMessageType('error');
          }
        } catch (error) {
          // If there is an error in making the request (e.g., network error)
          setMessage('An error occurred. Please check your connection and try again.');
          setMessageType('error');
        } finally {
          setLoading(false); // Always stop loading after the request
        }
    };
    return (
        
        <Box m="20px">
            <Header title="CREATE USER" subtitle="Create a New User Profile"/>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {
                    ({values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
                        <form onSubmit={handleSubmit} >
                            <Box 
                             display="grid" 
                             gap="30px" 
                             gridTemplateColumns="repeat(4, minmax(0,1fr))"
                             sx={{
                                "& > div": {girdColumn : isNonMobile ? undefined : "span 4"},
                             }}
                             >
                                <TextField 
                                 fullWidth
                                 variant="filled"
                                 type="text"
                                 label="First Name"
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.firstName}
                                 name="firstName"
                                 error={!!touched.firstName && !! errors.firstName}
                                 helperText={touched.firstName && errors.firstName}
                                 sx={{gridColumn: "span 2"}}
                                />
                                 <TextField 
                                 fullWidth
                                 variant="filled"
                                 type="text"
                                 label="Last Name"
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.lastName}
                                 name="lastName"
                                 error={!!touched.lastName && !! errors.lastName}
                                 helperText={touched.lastName && errors.lastName}
                                 sx={{gridColumn: "span 2"}}
                                />
                                <TextField 
                                 fullWidth
                                 variant="filled"
                                 type="text"
                                 label="Phone Number"
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.phoneNumber}
                                 name="phoneNumber"
                                 error={!!touched.phoneNumber && !! errors.phoneNumber}
                                 helperText={touched.phoneNumber && errors.phoneNumber}
                                 sx={{gridColumn: "span 4"}}
                                />
                                 <TextField 
                                 fullWidth
                                 variant="filled"
                                 type="text"
                                 label="Email"
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.email}
                                 name="email"
                                 error={!!touched.email && !! errors.email}
                                 helperText={touched.email && errors.email}
                                 sx={{gridColumn: "span 4"}}
                                />
                                <TextField 
                                 fullWidth
                                 variant="filled"
                                 type="text"
                                 label="Position"
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.position}
                                 name="position"
                                 error={!!touched.position && !! errors.position}
                                 helperText={touched.position && errors.position}
                                 sx={{gridColumn: "span 4"}}
                                />
                                <TextField 
                                 fullWidth
                                 variant="filled"
                                 type="text"
                                 label="Hire Date"
                                 onBlur={handleBlur}
                                 onChange={handleChange}
                                 value={values.hireDate}
                                 name="hireDate"
                                 error={!!touched.hireDate && !! errors.hireDate}
                                 helperText={touched.hireDate && errors.hireDate}
                                 sx={{gridColumn: "span 4"}}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type = "submit" color="secondary" variant="contained">
                                    Create New User
                                </Button>
                            </Box>
                        </form>
                    )
                }
            </Formik>
        </Box>
    )
}

export default Form;