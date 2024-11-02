import { Box, Typography, useTheme} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockDataTeam";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { LockOpenOutlined } from "@mui/icons-material";
import { SecurityOutlined } from "@mui/icons-material";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";


const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const colums = [
        // {field :"staffId", headerName :"ID"},
        { 
            field : "firstName", 
            headerName : "FirstName",
            flex: 1,
            cellClassName: "firstName-column--cell"
        },
        { 
            field : "lastName", 
            headerName : "LastName",
            flex: 1,
            cellClassName: "lastName-column--cell"
        },
        { 
            field : "phoneNumber", 
            headerName : "PhoneNumber",
            flex:1
        },
        { 
            field : "email", 
            headerName : "Email",
            flex: 1,
        },
        { 
            field : "position", 
            headerName : "Position",
            flex:1
        },
        { 
            field : "hireDate", 
            headerName : "HireDate",
            flex:1
        },
    ]   
    const[staffs, setStaffs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/Staff/staffs')
            .then((response) =>response.json())
            .then((json) => setStaffs(json))
            console.log("123467");
    }, []);
    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the Team Numbers"/>
            <Box 
            m="10px 0 0 0 " 
            height="75vh"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "&  .firstName-column--cell":{
                     color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders":{
                    backgroundColor: `${colors.blueAccent[700]} !important`,
                    borderBottom: "none"
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer":{
                    borderTop: "none",
                    background: colors.blueAccent[700]
                },  
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                 },
                 "& .css-1xsx59q-MuiDataGrid-root":{
                    background:"none"
                 }
                
            }}
            >
                <DataGrid checkboxSelection rows={staffs} getRowId={(row) => row.staffId} columns={colums} />
            </Box>
        </Box>
    )
}

export default Team;