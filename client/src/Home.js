import {useState, useEffect, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Axios from 'axios';
import GlobalContext from './GlobalContext';
import './cardflip.css';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function Home () {

    const {currentUserState, setCurrentUserState} = useContext(GlobalContext);
    const location = useLocation();
    const [hotelsState, setHotelsState] = useState();

    var allPlanets = [];
    if (hotelsState) {
        for (let i in hotelsState) {
            if (!allPlanets.includes(hotelsState[i].planet)) {
                allPlanets.push(hotelsState[i].planet);
            }
        }
    }

    useEffect(() => {
        Axios.get(`http://localhost:8800/api/hotels/`)
            .then((response) => {
                setHotelsState(response.data)
            })
    }, [])

    function displayPlanets () {
        const displayedPlanets = allPlanets.map((planet) => {
            var countHowManyHotelsInPlanet = 0;
            for (let i in hotelsState) {
                let currentHotel = hotelsState[i];
                if (planet === currentHotel.planet) {
                    countHowManyHotelsInPlanet += 1;
                }
            }
            return (
                <div key={planet} className="single-planet-container">
                    <h1>{planet}</h1>
                    <img src={require(`../pics/${planet.split(' ').join('')}.jpg`)} 
                        alt={planet} 
                        className="single-planet-image"
                    />
                    <p>{countHowManyHotelsInPlanet} hotels</p>
                </div>
            )
        })
        return displayedPlanets;
    }

    function displayFeaturedHotels () {
        if (hotelsState) {
            var firstArray = hotelsState;
            var firstFeaturedHotel = firstArray[getRandomInt(firstArray.length)]
            var secondArray = [];
            for (let i in hotelsState) {
                let currentHotel = hotelsState[i];
                if (currentHotel.name !== firstFeaturedHotel.name) {
                    secondArray.push(currentHotel);
                }
            }
            var secondFeaturedHotel = secondArray[getRandomInt(secondArray.length)];
            var featuredHotels = [firstFeaturedHotel, secondFeaturedHotel];
            const displayThem = featuredHotels.map((hotel) => {
                return (
                    <div key={hotel.name} className='flip-card single-featured-hotel'>
                    <div className="flip-card-inner">

                        <div className="flip-card-front">
                            <p>{hotel.name}</p>
                            <img className="hotel-pic-in-featured-page" src={require(`../pics/${hotel.name.split(' ').join('')}.jpg`)}></img>
                        </div>
                       
                        <div className="flip-card-back">
                            <p>{hotel.description}</p>
                            <p>Located on planet {hotel.planet}.</p>
                        </div>
                    </div>
                    </div>
                )
            })
            return displayThem;
        }
    }

    return (
        <div className="App-header">

                <h1 className='main-header'>
                    GalaxyStays.com
                </h1>
                
                <br></br>

                <h1 className='featured-hotels-heading'>Featured hotels:</h1>
                <div className='featured-hotels-container'>
                    {displayFeaturedHotels()}
                </div>

                <br></br>

                {/* display all hotel planets here */}
                <h1>Browse by planets:</h1>
                <div className='displayed-planets-container'>
                    {displayPlanets()}
                </div>
           
        </div>
    )
}

export default Home;