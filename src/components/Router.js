import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import HomeContainer from "../containers/HomeContainer";
import PopularContainer from "../containers/PopularContainer";
import DetailContainer from "../containers/DetailContainer"
import SearchContainer from "../containers/SearchContainer";
import HeaderContainer from "../containers/HeaderContainer";
import GenresListContainer from "../containers/GenresListContainer";
import KeywordContainer from "../containers/KeywordContainer";
import UpCommingContainer from "../containers/UpCommingContainer";

const RouterWrapper = () =>{
    return(
        <Router>
            <HeaderContainer/>
            <Switch>
                <Route path="/" exact component={HomeContainer} />
                <Route path="/home" exact component={HomeContainer} />
                <Route path="/popular" component={PopularContainer} />
                <Route path="/detail/:id" component={DetailContainer} />
                <Route path="/search" component={SearchContainer} />
                <Route path="/genreList/:id" component={GenresListContainer}/>
                <Route path="/keywordList/:id" component={KeywordContainer}/>
                <Route path="/upcoming" component={UpCommingContainer}/>
                {/* defaulft로 home */}
                <Redirect from="*" to="/" /> 
            </Switch>
        </Router>
    )
}

export default RouterWrapper;