import React from "react";
import style from "./Detail.module.css";
import { useParams } from "react-router-dom";

const Detail= function(props){
    const params = useParams();
    const id= params.bookId;
    const tmp = props.books.filter(book=> {
       return book.id.trim()===id.trim();
    });

     const book = tmp[0];
     const title = book.volumeInfo.title;
     const imgLink = book.volumeInfo.imageLinks.smallThumbnail;
     const amount = book.saleInfo.listPrice.amount;

     fetch("/addQuery",{
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body: JSON.stringify({"title":title,"adr":imgLink,"amount":amount})
     }).then(res =>{
         res.json().then(data =>{
             console.log(data);
         }) 
     }).catch(err=>{
         console.log(err);
     }); 

    return(
        <React.Fragment>
        <h1 className={style.heading}>DETAILS</h1>
        <div className={style.detail}>
            <img className={style.image} src={book.volumeInfo.imageLinks.smallThumbnail} alt="ImagePhoto"/>
            <div className={style.text}>
                <h2 className={style.title}>TITLE : {book.volumeInfo.title}</h2>
                <h2 className={style.title}>AMOUNT: ${book.saleInfo.listPrice.amount}</h2>
                <h2 className={style.title}>AUTHOR: {book.volumeInfo.authors[0]}</h2>
                <h2 className={style.title}>PUBLISHER: {book.volumeInfo.publisher}</h2>
                <h2 className={style.title}>PUBLISHED DATE: {book.volumeInfo.publishedDate}</h2>
                <a href={book.volumeInfo.previewLink} target="__blank"> VISIT THE BOOK</a>
            </div>
        </div>
        </React.Fragment>
    );
}

export default Detail;