import { Box, Typography, useTheme} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockDataTeam";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { LockOpenOutlined } from "@mui/icons-material";
import { SecurityOutlined } from "@mui/icons-material";
import Header from "../../Components/Header";
import React from "react";


const Dashboard = () => {
    return <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
    </Box>

}

export default Dashboard;