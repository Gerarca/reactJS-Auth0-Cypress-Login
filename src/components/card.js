import React, { useState } from "react";
import ModalInfoPokemon from "./modals/ModalPokeInfo";


export default function CardPokemon(pokemon) { 

    const [showModal, setShowModal] = useState(false);
    const [pokemonSelected, setPokemonSelected] = useState();

    const handlePokemonInfo = (pokemon) => { console.log(pokemon)
        setPokemonSelected(pokemon);
        setShowModal(true);
    }

    const capitalizeFirstLowercaseRest = (str) => {
        return (
          str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        );
      }; 

    return(
        <>
            <div key={pokemon.pokemon.id} className="bg-slate-50 max-w-xs rounded overflow-hidden shadow-lg m-4 rounded-lg transform transition duration-500 hover:scale-110 hover:shadow-2xl" onClick={()=>handlePokemonInfo(pokemon.pokemon)} >
                <div className="w-full flex">
                    <img className="w-48 h-48 mx-auto" src={pokemon.pokemon.sprites.front_default} alt={pokemon.pokemon.name} />
                </div>                            
                <div className="px-6 py-1">
                    <div className="font-bold text-xl mb-2">{capitalizeFirstLowercaseRest(pokemon.pokemon.name)}</div>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{pokemon.pokemon.moves[0].move.name}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{pokemon.pokemon.moves[1].move.name}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{pokemon.pokemon.moves[2].move.name}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{pokemon.pokemon.moves[3].move.name}</span>
                </div>
            </div>
            {
                showModal?
                    <ModalInfoPokemon pokemon={pokemonSelected} show={showModal} setShowModal={setShowModal} />                   
                :
                    null
            }
        </>
    )
}