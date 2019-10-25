import React from 'react';
import styled from "styled-components";
import empty from "../assets/img/empty.png"
import { Link } from "react-router-dom";

const MovieList = styled.li`
    display: inline-block;
    .movieBox {
        position: relative;
        overflow: hidden;
        width: 262px;
        height: 394px;
    }
    .movieBox img {
        cursor: pointer;
        width: inherit;
        height: inherit;
    }
    .movieContent {
        height: 150px;
        width: 262px;
        bottom : 0px;
        display: none;
        position: absolute;
        background-color: rgba(0,0,0,0.6);
        color: white;
    }
    .movieBox:hover .movieContent {
        display: block;
        z-index: 100;
        position: absolute;
    }
    .overView {
        line-height: 16px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: box;
        max-height: 80px;
        overflow: hidden;
        vertical-align: top;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        word-spacing: 0.07em;
        margin: 20px 30px 18px;
        font-size : 12px;
    }
    .originalTitle {
        margin-left : 18px;
        font-size: 14px;
    }
    .title {
        line-height: 50px;
        margin-left : 11px; 
        font-size: 16px;
    }
`;

const Item = ({list}) =>{
    return(
        <>
            {   
                list !== null ?
                list.map((item)=>{    
                    return (
                        <MovieList key={item.id}>
                            <Link to={`/detail/${item.id}`}>
                                <div className="movieBox">
                                    { item.poster_path !== null ? <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title}
                                    /> : <img src={empty} alt="empty"/>}
                                    <div className="movieContent">
                                        <span className="title">
                                            {item.title}
                                        </span>
                                        <br></br>
                                        <span className="originalTitle">
                                            {item.original_title}
                                        </span>                         
                                        <span className="overView">
                                            {item.overview}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </MovieList>
                    );
                }) : <></>
            }
        </>
    )
}

export default Item;