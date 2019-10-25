import React from 'react';
import styled from "styled-components";
import empty from "../assets/img/empty.png"
import star from "../assets/img/star.png";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Detail = ({result, isError, isLoading, history, keywordList}) =>{
    // if(!isLoading){
    //     console.log(result);
    //     console.log(isError);
    //     console.log(isLoading);
    //     console.log(history);
    //     console.log(keywordList);
    // }

    const DetailBox = styled.div`
        width: 90%;
        margin:0 auto;
        .keywordList span:hover {
            background: cornflowerblue;
            color: white;
            border: 1px solid black;
        }
        .movieMainInfo {
            margin: 0 auto;width: 500px;margin-top: 30px;
            @media ( max-width: 699px ) {
                width: 400px;
            }
        }
        .notFound {
            text-align: center;
            font-size: 20px;
            padding: 40px;
            font-weight: 600;
            text-decoration: underline;
            .img {
                font-size: 50px;
                padding-top: 50px;
            }
        }
        img {
            width: 200px;height: 300px;
            @media ( max-width: 699px ) {
                width: 150px;height: 225px;
            }
        }
        .movieMainInfoText{
            @media ( max-width: 699px ) {
                font-size: 14px;
                width: 210px;
                height: 190px;
                padding: 10px;
            }
            width: 260px;
            float: right;
            padding: 20px;
            height: 240px;
            margin-top: 20px;
            .genres span {
                margin-left: 5px;
            }
            p.title {
                font-size: larger;
                font-weight: 600;
                display : inline-block;
            }
            p.originTitle {
                color: #555;
                display : inline-block;
                margin-left: 7px;
            }
            p.genres {
                margin-top: 10px;
            }
            p{
                line-height:25px;
            }
        }
        .overview {
            @media ( max-width: 699px ) {
                width: 400px; 
                font-size: 15px;
            }
            width: 600px;
            margin: 50px auto 70px;
            line-height: 30px;
            font-size: 16px;
            text-align: center;
            font-weight: 600;
        }
        .tagline{
            @media ( max-width: 699px ) {
                width: 400px; 
                font-size: 17px;
                margin: 80px auto 60px;
            }
            font-weight: 900;
            padding: 5px;
            background: #444;
            line-height: 40px;
            font-style: italic;
            font-size: 20px;
            text-align: center;
            display: block;
            margin: 80px auto 60px;
            max-width: 800px;
            color: white;
        }
        .movieYoutubeBox{
            margin: 0 auto;
            width: 700px;
            height: auto;
            iframe {
                width : 700px;
                height: 400px;
            }
            @media ( max-width: 699px ) {
                width: 500px; 
                height : auto;
                font-size: 14px;
                iframe {
                    width : 500px;
                    height: 300px;
                }
            }
            @media ( max-width: 599px ) {
                font-size: 12px;
                width: 350px; 
                height : auto;
                iframe {
                    width : 350px;
                    height: 250px;
                }
            }
            .videoLabel {
                @media ( max-width: 599px ) {
                    font-size : 14px;
                    width : 300px;
                }
                top: -37px;
                font-weight: 400;
                background: #d91c0b;
                color: white;
                display: inline-block;
                padding: 7px 25px;
                border-radius: 20px 20px 0 0;
                margin-top: 8px;
            }
        }
        .keywordList {
            max-width: 1000px;
            margin: 0 auto;
            text-align: center;
            padding: 40px 0px 60px;
        }
        .keywordList span {
            text-align: center;
            border: 1px solid;
            border-radius: 20px;
            background: aliceblue;
            font-size: 15px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            padding: 1px 10px;
        }
        .keywordList p {
            font-weight: 600;
            margin-bottom: 30px;
        }
    `;
    const Rank = styled.div`
        display:flex;margin:10px 0;
        .star{
            width:103px;height:16px;background:url(${star}) no-repeat;background-size:103px auto;margin-top:1px;
            .per{
                width:${props => props.star}%;height:100%;font-size:0;
                background:url(${star}) no-repeat 0 100%;background-size:103px auto;
            }
        }
        .text{
            margin-left:10px;color:#666;font-size:14px;
            span{color:#333;font-weight:bold;}
        }
    `;
    return(
        <DetailBox>
            {
                isLoading ? 
                    (
                        <Loading></Loading>                        
                    ) 
                    :
                    (
                        isError ? 
                        (
                            <div className="notFound">
                                콘텐츠를 찾을 수 없습니다.
                                <div className="img">
                                    404 error
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="movieInfoBox">
                                <div className="movieMainInfo">
                                    {result.poster_path !== null ?
                                    <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}  alt={result.title} /> : <img src={empty} alt="empty"/>
                                    }
                                    <div className="movieMainInfoText">
                                        <p className="title">
                                            {result.title}   
                                        </p>
                                        <p className="originTitle">  
                                            {
                                                result.original_title
                                            }
                                        </p>
                                        <Rank star={result.vote_average * 10}>
                                            <div className="star">
                                                <div className="per">{result.vote_average * 10}%</div>
                                            </div>
                                            <p className="text"><span>{result.vote_average}</span> / 10</p>
                                        </Rank>

                                        <p className="genres">
                                            장르 : 
                                            {
                                                result.genres.map(genre => 
                                                <span key={genre.id}>
                                                    <Link to={`/genreList/${genre.id}`}>
                                                        {genre.name}
                                                    </Link>
                                                </span>)
                                            }
                                        </p>
                                        <p>
                                            나라 : {
                                                result.production_countries[0] == null ? "알 수 없음" :result.production_countries[0].name
                                            }
                                        </p>
                                        <p>
                                            개봉일 : {result.release_date}
                                        </p>
                                        <p>
                                            상영시간 : {result.runtime} 분
                                        </p>
                                    </div>
                                </div>
                                {result.tagline === "" ?  <></> : <span className="tagline">{result.tagline}</span>}
                                <div className="overview">
                                    {result.overview}
                                </div>
                                <div className="movieYoutubeBox">
                                    { 
                                        result.videos.results.map(item => {
                                                return(
                                                    <div key={item.id}>
                                                        <div className="videoLabel">{item.name}
                                                        </div>
                                                        <iframe src={`https://www.youtube.com/embed/${item.key}`} title={item.name} key={item.id}></iframe>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>
                                <div className="keywordList">
                                    {keywordList.length !== 0 ? <p>관련 태그</p> : <></>}
                                    { 
                                        keywordList.map((item)=>{
                                            return <Link to={`/keywordList/${item.id}`} key={item.id}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </Link>
                                        })
                                    }
                                </div>

                            </div>
                        )
                    )
            }
        </DetailBox>
    )
}

export default Detail;