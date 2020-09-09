import React, { FunctionComponent, useCallback } from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Landing from '../components/landing/Landing'
import Home from '../components/home/Home'
import {disconnectUser, isUserConnected, connectUser} from './userAccess'
import PrivateRoute from '../components/utils/PrivateRoute'
import MyLibrary from '../components/myLibrary/MyLibrary'
import Playlist from '../components/playlist/Playlist'
import NotFound from '../components/notfound/notfound'

const Routes = () => {
    const renderLanding = useCallback(() => {
        const response = isUserConnected()
        return response.connected
            ? <Redirect to="/home"/>
            : <Landing/>
    },[])

    const renderLogin = useCallback(() => {
        const {REACT_APP_SERVER_URL: serverURL} = process.env
        window.location.href = `${serverURL}/login`
        return <></>
    },[])

    const renderLogoff = useCallback(() => {
        disconnectUser()
        const response = isUserConnected()
        return response.connected
            ? <Redirect to="/home" />
            : <Redirect to="/" />
    },[])

    const renderPrivateRoute = useCallback((Component: FunctionComponent) => {
        connectUser()
        const response = isUserConnected()
        return response.connected 
            ? <PrivateRoute Component={Component} accessToken={response.accessToken} refreshToken={response.refreshToken}/>
            : <Redirect to="/" />
    },[])

    return <>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={renderLanding}/>
                <Route exact path="/login" render={renderLogin}/>
                <Route exact path="/logoff" render={renderLogoff} />
                <Route exact path="/home" render={ () => renderPrivateRoute(Home) }/>
                <Route exact path="/my-library" render={ () => renderPrivateRoute(MyLibrary) }/>
                <Route exact path="/playlist/:id" render={ () => renderPrivateRoute(Playlist) } />
                <Route exact path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    </>
}

export default Routes