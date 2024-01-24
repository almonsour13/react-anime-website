import React from "react";
import {useState, useEffect,useRef} from 'react'
import { Link, useResolvedPath, useMatch} from "react-router-dom";

const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showInnerSearchBar, setShowInnerSearchBar] = useState("");
    

    useEffect(() => {
        fetchSearchResults();
    }, [searchQuery]);
    
    const fetchSearchResults = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&sfw`)
            const data = await response.json();
            setSearchResults(data.data.slice(0, 5));
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
     };

     const divRef = useRef();

     const handleClickOutside = (event) => {
       if (divRef.current && !divRef.current.contains(event.target)) {
            setShowInnerSearchBar("")
       }
     };
   
     useEffect(() => {
       const handleWindowClick = (event) => {
         handleClickOutside(event);
       };
       window.addEventListener('click', handleWindowClick);
       return () => {
         window.removeEventListener('click', handleWindowClick);
       };
     }, []);

    const showMenuList = () =>{
        setShowMenu(true)
    }
    const hideMenuList = () =>{
        setShowMenu(false)
    }
    const handleShowSearchBar = () =>{
        setShowSearchBar(true)
    }
    const handleHideSearchBar = () =>{
        setShowSearchBar(false)
    }
    const removeInputValue = () =>{
        setSearchQuery("")
        setShowInnerSearchBar("")
    }
    const handleInput = (event) =>{
         setSearchQuery(event.target.value)
         setShowInnerSearchBar(event.target.value)
    }

    return(
        <nav className="nav-bar">
            <div className="left">
                <div className="logo-container">
                   AMS
                </div>
                <div className={`search-bar-container ${showSearchBar?"active":""}`}>
                    <div className={`inner-container ${showInnerSearchBar?"show":""}`} ref={divRef}>
                        <div className="top">
                            <button className="back-search" onClick={handleHideSearchBar}><i class="fa-solid fa-arrow-left"></i></button>
                            <div className="search-bar">
                                <button className="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
                                <input type="text" className="search-input" placeholder="Search here" value={searchQuery} onChange={handleInput}/>
                                <button className={`search-remove-btn ${searchQuery?"show":""}`} onClick={removeInputValue}><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </div> 
                        <div className={`bottom ${searchQuery && showInnerSearchBar?"show":""}`}>
                            <div className={`best-result ${searchResults.length>0?"show":""}`}>BEST RESULTS</div>
                            {Array.isArray(searchResults) && searchResults.length > 0 ?(
                                
                                searchResults.map((result) => (
                                    <div className="search-result">
                                            <div className="result-card">
                                                <div className="poster" style={{ backgroundImage: `url(${result.images.jpg.image_url})` }}></div>
                                                <div className="description">            
                                                     <div className="title">{result.title}</div>
                                                     <div className="episodes">Episodes: {result.episodes}</div>
                                                     <div className="status">{result.status}</div>
                                                </div>
                                            </div>
                                    </div>
                                ))
                            ):(
                                <div className="no-result">NO RESULT</div>
                            )}
                            <div className={`see-all-result ${searchResults.length>0?"show":""}`}>
                                    See all result
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`right ${showMenu === true?"active":""}`}>
                <div className="close-menu-button"><button className="close-btn" onClick={hideMenuList}><i class="fa-solid fa-xmark"></i></button></div>
                <div className="menu-list">
                    {/* <a href="#Home" className="active">Home</a>
                    <a href="#Home">Anime</a>
                    <a href="#Home">Genre</a>
                    <a href="#Home">Collection</a>
                    <a href="#Account" className="account-setting">Account</a> */}
                    <CustomLink to="/home">Home</CustomLink>
                    <CustomLink to="/anime">Anime</CustomLink>
                    <CustomLink to="/genre">Genre</CustomLink>
                    <CustomLink to="/collection">Collection</CustomLink>
                </div>
                <button className="account">A</button>
            </div>
            <div className="nav-bar-btn">
                <button className="search-bar-btn" onClick={handleShowSearchBar}><i class="fa-solid fa-magnifying-glass"></i></button>
                <button className="menu-btn" onClick={showMenuList}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </button>
            </div>
        </nav>
    );
}
const CustomLink = ({ to, children, ...props }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
};

export default NavBar;