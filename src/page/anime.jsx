import React, { useEffect, useState } from "react";

const Anime = () => {
    const [results, setResults] = useState([]);
    const [columns, setColumns] = useState(6);

    useEffect(() => {
        fetchSearchResults();
        handleResize(); 
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const fetchSearchResults = async () => {
        try {
            const response = await fetch("https://api.jikan.moe/v4/anime");
            const data = await response.json();
            setResults(data.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };
    const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1200) {
            setColumns(6);
        } else if (windowWidth >= 992) {
            setColumns(5);
        } else if (windowWidth >= 768) {
            setColumns(4);
        } else if (windowWidth >= 600){
            setColumns(3);
        }else{
            setColumns(2);
        }
    }

    return (
        <div>
            <h1>Anime</h1>
            {results.length>0? (
            <div className="inner-content" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {results.map((anime) => ( 
                    <div className="cards">
                        <div className="poster" style={{ backgroundImage: `url(${anime.images.jpg.image_url})` }}></div>
                        <div className="description">
                            <div className="title">{anime.title}</div>
                            <div className="status"> <span>{anime.status}</span></div>
                        </div>
                        <div className="hovered-more-details">
                            {/* <div className="more-details">

                            </div> */}
                            <div className="watch-add">
                                <button className="watch-trailer" title="Watch Trailer"><i class="fa-solid fa-play"></i></button>
                                <button className="add-to-collection" placeholder="Add to collection"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            ) : (
                <p>Loading anime data...</p>
        )}
        </div>
    );
};

export default Anime;
