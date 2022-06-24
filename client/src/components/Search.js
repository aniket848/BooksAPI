import React,{useEffect, useState} from 'react';
import {Routes,Route} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form , Button} from 'react-bootstrap';
import Detail from "./Detail";
import Book from "./Book";
import Query from "./Query";

const Block = styled.div`
    display:grid;
    padding:10px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1rem;
`;



const Search = function(){

   const [book,setBook] = useState();
   const apiKey = "AIzaSyCT2x3XpId_jb6CI5OjWH2hkH1bev8wOOQ";
   const [result , setResult] = useState([]);
   const [queries , setQuery]  = useState([]);

    const callSearchPage = async()=>{
        try{
            const res = await fetch('/search',{
                method:'GET',
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
        }catch(err){
            console.log(err);
        }
    }

     useEffect(()=>{
        callSearchPage();
     },[])

   const handleSubmit= (event)=>{
       event.preventDefault();
       setQuery([]);
       console.log(book);
       if(book==="" || !book){
          window.alert("Enter valid value");
       }else{
        axios.get('https://www.googleapis.com/books/v1/volumes?q='+book+'&key='+apiKey+'&maxResults=40'
        ).then(data =>{
             setResult(data.data.items);
             //console.log(result);
        })
          .catch(err =>{
               console.log(err);
        })
      }
   }  

   const handleQueries = (e)=>{
       e.preventDefault();
       //console.log("reached queries");
        setResult([]);
       fetch('/search').then(res=>{
           res.json().then(data=>{
              setQuery(data.queries);
              console.log("Queries = " , data.queries);
              if(data.queries.length ===0 ){
                return window.alert("No past queries exist for this user");
              }
           })
       }).catch(err=>{
          console.log(err);
       });
   }

   const handleChange=(e)=>{
       setBook(e.target.value);
    }

     
    

   return(
        <React.Fragment>
        <Routes>
         
         <Route path="/search" element={<Form className='mt-10' >
         <h1 style={{textAlign:'center' , marginBottom:'1.5rem'}}>SEARCH</h1>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Search Book</Form.Label>
      <Form.Control type="text" placeholder="Search The Book..." onChange={handleChange} autoComplete="off"/>
    </Form.Group>
    <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
    </Button>

    <Button variant="primary" type="submit" onClick={handleQueries} style={{marginLeft:'1rem'}}>
         Past Queries
    </Button>

    <Block>
        {
            result.map(book =>(
                <Book book={book} key={book.id}/>
            ))
        }
    </Block>

    <Block>{
                      
            
               queries.map(res =>(
                 <Query query={res.query} key={res._id}/>
               ))
            
         }
    </Block>
</Form>}/>   
        
        <Route path="/search/detail/:bookId" element={<Detail books={result}/>} exact/>
        </Routes>
        </React.Fragment> 
    );
}

export default Search;