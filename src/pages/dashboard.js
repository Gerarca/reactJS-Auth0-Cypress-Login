import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import Card from "../components/card";
import background from "../assets/background.webp";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    if(isAuthenticated === false){
        navigate("/");
    }       
  
    const [pokeData,setPokeData]=useState([]);
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10")
    const [totalPages, setTotalPages]=useState(0);
 
    const getPokemon=async(res)=>{ 
        setPokeData([]);
        res.map(async(item)=>{ 

            const result =await axios.get(item.url)
            setPokeData((state)=>{ 
                state=[...state,result.data]
                state.sort((a,b)=>a.id>b.id?1:-1)
                return state;
            })
        })   
    }

    useEffect(()=>{ 
        const abortController = new AbortController();
        const pokeFun=async()=>{
            try {
                const res=await axios.get(url,{
                    signal: abortController.signal
                });
                setTotalPages(res.data.results.length)
                await getPokemon(res.data.results)

            } catch (error) {                
                if (error.name !== "AbortError") {
                    //console.log("useEffect Error: ", error)
                }
            }
        }

        pokeFun();
        return () => abortController.abort();
    },[url]) 

    const pagginationHandler = (page) => { 
        setPokeData([]);
        setUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${page.selected}&limit=10`)
    };

    return(
        <> 
            <div className="flex items-center justify-center" style={{ backgroundImage: `url(${background})` }}>
                <div className="grid md:grid-cols-3 md:gap-3 mt-10"> 
                    {    
                        /*------Card List  ------- */
                        pokeData.length === 10 ? 
                            pokeData.map((item, index) => { 
                                    return(
                                        <Card 
                                            key={index}
                                            pokemon={item} 
                                        /> 
                                    )                            
                                })
                            
                        :   
                            /*------Loadding  ------- */
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </div>                     
                    }                
                </div>  
            </div>
            {/*------Pagination  -------*/}
            <div className="flex items-center justify-center py-8" style={{ backgroundImage: `url(${background})` }}>
                <ReactPaginate                    
                    previousLabel="Atras"
                    previousClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    nextLabel="Siguiente"
                    nextClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    breakLabel="..."
                    breakClassName="inline-flex -space-x-px"
                    pageClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    containerClassName={"pagination-container flex"}
                    activeClassName={"bg-slate-200"}  
                    pageRangeDisplayed={5}
                    pageCount={totalPages}    
                    onPageChange={pagginationHandler}      
                />
            </div> 
        </>
    )
}

export default Dashboard;