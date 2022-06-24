import React from 'react';
import style from "./Books.module.css";
import { Link} from 'react-router-dom';


const Book = (props)=>{
    let imgAdr = props.book.volumeInfo.imageLinks && props.book.volumeInfo.imageLinks.smallThumbnail;
    let amount = props.book.saleInfo.listPrice && props.book.saleInfo.listPrice.amount;
    let title = props.book.volumeInfo.title;
    const adr = "detail/"+ props.book.id;
    console.log(imgAdr);
    if(imgAdr!==undefined && amount!==undefined){ 
    return(
        <React.Fragment>
            <div className={style.book}>
                <img className={style.image} src={imgAdr} alt="imageofphoto"/>
                <h2 className={style.heading}>{title}</h2>
                <Link className={style.detail} to={adr}>Know More</Link>
            </div>
        </React.Fragment>
    );
    }
}

export default Book;