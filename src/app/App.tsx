import React from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import {Login} from "../features/login/Login";
import Error404 from "../features/Page-not-found/Error404";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.login.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType,boolean>(state => state.app.isInitialized)
    let navigate = useNavigate()
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Button color="inherit" onClick={() => {
                        navigate('/')}}>Home</Button>
                    {/*<Typography variant="h6">*/}
                    {/*    News*/}
                    {/*</Typography>*/}
                    <Button color="inherit"  disabled={isLoggedIn} onClick={() => {
                        navigate('login')}}>LogIn</Button>
                    <Button color="inherit" onClick={() => {
                        }}>LogOut</Button>
                </Toolbar>

                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList demo={demo}/>}/>
                    <Route path={"login"} element={<Login/>}/>
                    {/*<Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>*/}
                    <Route path={'/404'} element={<Error404/>}/>
                    <Route path={'*'} element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
