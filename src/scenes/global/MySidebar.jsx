import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import 'react-pro-sidebar/dist/css/styles.css';
import {Box, IconButton, Typography, useTheme} from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon  from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon  from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon  from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon  from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon  from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon  from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon  from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon  from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon  from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon  from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon  from "@mui/icons-material/MapOutlined";
import MenuOutlinedIcon  from "@mui/icons-material/MenuOutlined";


const Item = ({ title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{color : colors.grey[100]}}
            onClick={() => setSelected(title)}
            icon={icon}
            component={<Link to={to} />}
            // routerLink={<Link to={to} />}
        >
            <Typography>{title}</Typography>
            {/* {<Link to={to} />} */}
        </MenuItem>
    );
};

const MySidebar = () => { 
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                "& .ps-sidebar-container": {
                    background: `${colors.primary[400]} !important`,
                  },
                  "& .ps-menu-icon": {
                    backgroundColor: "transparent !important",
                  },
                  "& .ps-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                  },
                  "& .ps-menu-button:hover": {
                    color: "#868dfb !important",
                    backgroundColor: "transparent !important",
                  },
                  "& .ps-menuitem-root .ps-active": {
                    color: "#6870fa !important",
                   }
            }}
        >
            <Sidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/*LOGO AND MENU ICON */}
                    <MenuItem 
                    onClick={()=> setCollapsed(!isCollapsed)}
                    icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                    style={{
                        margin: "10px 0 20px 0",
                        color: colors.grey[100],
                    }}
                    >
                    {!isCollapsed && (
                        <Box 
                        display="flex" 
                        justifyContent="space-between" 
                        alignItems="center" 
                        ml="15px"
                        >
                            <Typography variant="h3" color={colors.grey[100]}>
                                ADMINS
                            </Typography>
                            <IconButton onClick={()=> setCollapsed(!isCollapsed)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        </Box>
                    )}
                    </MenuItem>

                    {/* USER */}
                    {!isCollapsed &&(
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img 
                                alt="profile-user"
                                width="100px"
                                height="100px"
                                src={`../../assets/user.png`}
                                style={{ cursor: "pointer", borderRadius: "50%", backgroundColor:"#141b2d"}}
                                
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography 
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0"}}
                                >
                                        Nghia Pham
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    VP Fancy Admin
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* MENU ITEMS */}
                    <Box
                        paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                        title="Dashboard"
                        to="/"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{m : "15px 0 5px 20px" }}
                        >
                            Data
                        </Typography>
                        <Item
                        title="Manage Team"
                        to="/team"
                        icon={<PeopleOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Contacts Information"
                        to="/contacts"
                        icon={<ContactsOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Invoices Balances"
                        to="/invoices"
                        icon={<ReceiptOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{m : "15px 0 5px 20px" }}
                        >
                            Pages
                        </Typography>
                        <Item
                        title="Profile Form"
                        to="/form"
                        icon={<PersonOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Calendar"
                        to="/calendar"
                        icon={<CalendarTodayOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="FAQ Page"
                        to="/faq"
                        icon={<HelpOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{m : "15px 0 5px 20px" }}
                        >
                            Chart
                        </Typography>
                        <Item
                        title="Bar Chart"
                        to="/bar"
                        icon={<BarChartOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Pie Chart"
                        to="/pie"
                        icon={<PieChartOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Line Chart"
                        to="/line"
                        icon={<TimelineOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Geography Chart"
                        to="/geography"
                        icon={<MapOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default MySidebar;