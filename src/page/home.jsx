import React, { useEffect, useState } from "react";

const Home = () => {
    const [columns, setColumns] = useState(6);

    useEffect(() => {
        handleResize(); 
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
            <div style={{
                        display: 'flex', justifyContent: 'center', alignContent: 'center',
                        flexDirection:'column', gap: '40px'
            }}>
                <Carousel apiLink={"https://api.jikan.moe/v4/top/anime"} header={"Top Anime"}></Carousel>
                <Carousel apiLink={"https://api.jikan.moe/v4/seasons/now"} header={"Seasonal Anime"}></Carousel>
                <Carousel apiLink={"https://api.jikan.moe/v4/seasons/upcoming"} header={"Top Anime"}></Carousel>
            </div>
        </div>
    );
};
const Carousel = (props) => {
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    
    useEffect(() => {
        fetchSearchResults();
        handleResize(); 
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    },[]);

    const fetchSearchResults = async () => {
        try {
            const response = await fetch(props.apiLink);
            const data = await response.json();
            setResults(data.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 1200) {
            setItemsPerPage(6);
        } else if (windowWidth >= 992) {
            setItemsPerPage(5);
        } else if (windowWidth >= 768) {
            setItemsPerPage(4);
        } else if (windowWidth >= 600){
            setItemsPerPage(3);
        }else{
            setItemsPerPage(2);
        }
    }


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = results ? results.slice(startIndex, endIndex) : [];


    const handlePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    return(
        <div className="outer-container">
        {results && results.length > 0 ? (
          <div>
            <h1 className="home-header-title">{props.header}</h1>
            <div
              className="top-inner-content"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                gap: '20px',
              }}
            >
              {paginatedData.map((anime) => (
                <Card key={anime.mal_id} data={anime} />
              ))}
            </div>
            <div className="paginations">
              <div className="paginated-button">
                <button onClick={() => handlePage(currentPage === 1 ? 1 : currentPage - 1)}>prev</button>
                <button onClick={() => handlePage(currentPage === Math.ceil(results.length / itemsPerPage) ? currentPage : currentPage + 1)}>next</button>
              </div>
              <div className="paginated-see-all">
                <a href="#Seeall">See All</a>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      
    );
}
const Card = (props) =>{
    return(
        <div className="cards">
            <div className="poster" style={{ backgroundImage: `url(${props.data.images.jpg.image_url})` }}></div>
                <div className="description">
                    <div className="title">{props.data.title}</div>
                    <div className="status"> <span>{props.data.status}</span></div>
                </div>
            <div className="hovered-more-details">
                <div className="watch-add">
                    <button className="watch-trailer" title="Watch Trailer"><i class="fa-solid fa-play"></i></button>
                    <button className="add-to-collection" placeholder="Add to collection"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </div>
    );
}
export default Home;
