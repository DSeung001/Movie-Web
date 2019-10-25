import React from "react";
import {moviesApi} from "../api";
import Item from "../components/Item";
import List from "../components/List";
import Loading from "../components/Loading";
import { connect } from 'react-redux';

class ListContainer extends React.Component{
    //스크롤 해야지 변경된 id가 적
    state = {
        isLoading : true,
        page : 1,
        content : [],
        first : true,
    };

    getMoviesList = async(page) => {
        const mode = this.props.mode;
        let movies;
        if(mode !== null){
            try{
                if(mode=== "nowPlaying" ){
                    movies = await moviesApi.nowPlaying(page);
                }else if(mode === "topRated"){
                    movies = await moviesApi.topRated(page);
                }else if(mode === "genreListView"){
                    movies = await moviesApi.genreListView(this.props.genreId, page);
                }else if(mode === "keywordListView"){
                    movies = await moviesApi.keywordListView(this.props.keywordId,page);
                }else if(mode === "upComing"){
                    movies = await moviesApi.upcoming(page);
                }
                movies =  movies.data.results;
            }catch(e){
                console.log(e);
                movies = null;
            }
        }else{
            console.log("mode : "+null);
        }
        return movies;
    }

    setContent = async()=>{
        let content = [];
        for(let re = 1; re <= this.state.page ; ++re){
            content.push(<Item key={re} list={await this.getMoviesList(re)}></Item>);     
        }
        this.setState({isLoading : false, content});
    }

    UNSAFE_componentWillReceiveProps(){
        this.setState({first : true});
    }

    componentDidUpdate(){
        if(this.state.first){
            this.setState({first : false});
            this.setContent();
        }
    }

    componentDidMount(){      
        this.setContent();
        window.addEventListener("scroll", this.handleScroll);
    }   
    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const { innerHeight } = window; //화면 높이
        const { scrollHeight } = document.body; //전체 스크롤 가능 길이
        // IE에서는 document.documentElement 를 사용.
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;//스크롤 위치
        //전체 스크롤은 화면 높이를 포함해서 화면 높이를 뺴고 현재 스크롤 위치를 뺌
        if (scrollHeight - innerHeight - scrollTop < 1) {
            const notice = document.getElementById("notice");
            if(notice !== null){
                document.getElementById("notice").style.display = "block";
                setTimeout(()=>{
                    document.getElementById("notice").style.display = "none";
                },800);
                this.setState({
                    page : this.state.page+1
                })
                this.setContent();
            }
        }
    };

    render(){
        const {isLoading, content} = this.state;
        return (
            <>
                {
                    isLoading === true ? 
                    <Loading/> 
                    : 
                    <List content={content}/>
                }
            </>
        );
    }
}

const mapStateToProps = ({list}) => ({
    mode : list.mode
});

export default connect(
    mapStateToProps,
)(ListContainer);
