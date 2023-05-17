import React, { Component } from 'react';
import { SearchBar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import * as API from 'services/Api';
import { Modal } from './Modal';
import { Circles } from 'react-loader-spinner';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    showModal: false,
    selectedImage: null,
  };

  toggleModal = image => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedImage: image,
    }));
  };

  getImages = async values => {
    try {
      this.setState({ isLoading: true });
      const images = await API.getImages(values);
      this.setState({ images: images.hits });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, images, showModal, selectedImage } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <SearchBar onSubmit={this.getImages} isSubmitting={isLoading} />
        {isLoading && (
          <Circles
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
          />
        )}
        {images.length > 0 ? (
          <ImageGallery items={images} onClick={this.toggleModal} />
        ) : null}

        {showModal && selectedImage && (
          <Modal onClose={this.toggleModal}>
            <img
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
              }}
              src={selectedImage.largeImageURL}
              alt={selectedImage.tags}
            />
          </Modal>
        )}
      </div>
    );
  }
}
