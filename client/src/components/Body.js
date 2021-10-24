import { useState, useEffect } from 'react'
import GameList from './Gamelist'

const Body = () => {

    const [games, setGames] = useState([]);
    const [name, setName] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [genre, setGenre] = useState("");


    useEffect(() => {
        fetch("api/games")
          .then((r) => r.json())
          .then((games) => setGames(games));
      }, []);

    //   console.log(games)

      function deleteItem(id) {
        const deleteItem = games.filter(game => game.id !== id)
        setGames(deleteItem)
    }

    function onAddGame(newGame) {
        const updatedGameArray = [...games, newGame];
        setGames(updatedGameArray);
      }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("api/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            release_date: releaseDate,
            price: price,
            image: image,
            genre: genre
        }),
        })
        .then((r) => r.json())
        .then((newGame) => onAddGame(newGame));
    
    }

    function onUpdateGame(updatedGame) {
        const updatedGamesArray = games.map((game) => {
          if (game.id === updatedGame.id) {
            return updatedGame;
          } else {
            return game;
          }
        });
        setGames(updatedGamesArray);
      }
     
     

    return (
        <div>
            <div>
            
            <div className="herosection">
                <img src="https://i.imgur.com/VRafUnO.jpg"/>
                </div>
                
               <h3 className="addnewgame">Add a new game ⬇️</h3>
                <form onSubmit={handleSubmit} className="newgameform">
                <input
                type="text"
                placeholder="Game Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Release Date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                />
                <input
                type="number"
                placeholder="$ Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
                <input
                type="string"
                placeholder="Image Address"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                />
                 <input
                type="string"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                />
                <button type="submit" className="centeringBtn">Add</button>
                </form>
              
               
            </div>
           
            <div className="cardcontainer">
            {games.map(game => (
                <div className="cardindividual">
                    <GameList
                    key={games.id}
                    game={game}
                    deleteItem={deleteItem}
                    setGame={setGames}
                    onUpdateGame={onUpdateGame}
                    />  
                </div>  
            ))}
            </div>
            
            
        </div>
    )
}

export default Body
