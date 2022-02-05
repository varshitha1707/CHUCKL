import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Lottie from 'react-lottie';
import jokes from './jokesAhoyLoader.json'

function Home() {
  const [joke, setJoke] = useState({});
  const [loading, setLoading] = useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: jokes,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }; 

  const getJoke = () => {
    setLoading(true)
    axios.get('https://karljoke.herokuapp.com/jokes/random')
      .then(res => {
        setJoke(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getJoke();
  }, []);

  return<div>
          <div className="Joke">
            <h1 className="Joke-heading">CHUCKL.</h1>
            <h2 className="Joke-Subheading">chuckl, a way for you to chuckle 🥳</h2>
            <div className='Joke-card'>
            {
              loading?
                <div><Lottie options={defaultOptions} height={300} /></div> 
              :
                <div>
                  <h2 className="Joke-card-setup">{joke.setup}</h2>
                  <h3 className="Joke-card-punchline">{joke.punchline}</h3>
                  <button className="Joke-card-button" onClick={getJoke}>One More!</button>
                </div>
            }
            </div>
          </div>
        </div>;
}

export default Home;
