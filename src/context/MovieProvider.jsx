import React, { useState } from 'react';
import { createContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import YouTube from 'react-youtube';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const MovieContext = createContext();
const MovieProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const handleTrailer = async (id) => {
    setTrailerKey('');
    try {
      //ngoawc ` moi truyen ${id} dduoc
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const movieKey = await fetch(url, options);
      const data = await movieKey.json();
      setTrailerKey(data.results[0].key);
      setModalIsOpen(true);
      console.log(data);
    } catch (error) {
      setModalIsOpen(false);
      console.error('Error fetching trailer:', error);
    }
  };
  return (
    <MovieContext.Provider value={{ handleTrailer }}>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: 'fixed',
            zIndex: 9999,
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
        contentLabel="Example Modal"
      >
        <YouTube videoId={trailerKey} opts={opts} />
      </Modal>
    </MovieContext.Provider>
  );
};
MovieProvider.prototype = {
  children: PropTypes.node,
};
export { MovieProvider, MovieContext };
