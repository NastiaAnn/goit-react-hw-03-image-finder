import React, { Component } from 'react';
import { SearchBar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
<<<<<<< Updated upstream
=======
// import { Modal } from './Modal';
// import { Circles } from 'react-loader-spinner';
// import axios from 'axios';
>>>>>>> Stashed changes

export class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
<<<<<<< Updated upstream
    const { imageName } = this.state;
=======
>>>>>>> Stashed changes
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <SearchBar onSubmit={this.handleFormSubmit} />
<<<<<<< Updated upstream

        <ImageGallery imageName={imageName} />
=======
        <ImageGallery imageName={this.state.imageName} />

        {/* <Circles
          height="100"
          width="100"
          color="#004F98"
          ariaLabel="circles-loading"
          wrapperStyle={{
            marginTop: '50px',
            display: 'flex',
            justifyContent: 'center',
          }}
          wrapperClass=""
          visible={true}
        /> */}

        {/* <ImageGallery items={images} /> */}
>>>>>>> Stashed changes
      </div>
    );
  }
}
