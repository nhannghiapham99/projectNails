import React from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Topbar from "./scenes/global/Topbar";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import Dashboard from "./scenes/dashboard";
import MySidebar from './scenes/global/MySidebar';
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Calendar from "./scenes/calendar";
import Geography from './scenes/geography';
import { useState } from 'react';
import Login from './scenes/login/Login';

function App () {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (<ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline>
                 <div className='app'>
                    <MySidebar isSidebar={isSidebar} />
                    <main className='content'>
                        <Topbar setIsSidebar={setIsSidebar} />
                        
                        <Routes>
                            <Route path="/*" element={<Dashboard />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="/contacts" element={<Contacts />} />
                            <Route path="/invoices" element={<Invoices />} />
                            <Route path="/form" element={<Form />} />
                            <Route path="/bar" element={<Bar />} />
                            <Route path="/pie" element={<Pie />} />
                            <Route path="/line" element={<Line />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/geography" element={<Geography />} />
                        </Routes>
                    </main>
                 </div>
            </CssBaseline>
        </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
