import React from 'react';
import style from "./Query.module.css";


const Query = (props)=>{
    //console.log(adr);
    if(props.query.adr!==undefined && props.query.amount!==undefined){
       console.log(props.query);  
    return(
        <React.Fragment>
            <div className={style.book}>
                <img className={style.image} src={props.query.adr} alt="imageofphoto"/>
                <h2 className={style.heading}>{props.query.title}</h2>
                <h3 className={style.amount}>{props.query.amount}</h3>
            </div>
        </React.Fragment>
    );
    }
}

export default Query;