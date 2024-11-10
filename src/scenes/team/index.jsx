import { Box, Typography, useTheme} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockDataTeam";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { LockOpenOutlined } from "@mui/icons-material";
import { SecurityOutlined } from "@mui/icons-material";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";
import moment from 'moment';
import { Button } from '@mui/material';
const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const [error, setError] = useState(null);
    const [arrIds, setArrIds] = useState([]);
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
        {
            field : 'CreatedAt',
            headerName : 'Created At',
            width : 200,
            renderCell: (params) =>
                moment(params.row.CreatedAt).format('YYYY-MM-DD HH:MM:SS'),
        },
        {
            field: 'action',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteAll(params.id)  }
                
              >
                Delete
              </Button>
            ),
          },
    ]   
    const[staffs, setStaffs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/Staff/staffs')
            .then((response) =>response.json())
            .then((json) => setStaffs(json))
            
    }, []);
    const handleDeleteAll = (id) => {
        console.log(id);
        fetch(`http://localhost:8081/Staff/${id}`,{
            method:"DELETE"
            
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // This is where the error might occur
        })
        .then(data => {
            console.log('Success:', data);
            alert('new Staff delete'); 
        })
        .catch(error => {
            // console.error('Error:', error);
            alert('Success'); 
        });
    };
    
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
                
                <DataGrid  
                // checkboxSelection 
                rows={staffs} 
                getRowId={(row) => row.staffId} 
                columns={colums} 
                disableRowSelectionOnClick   
                />
            </Box>
            
        </Box>
        
    )
}

export default Team;