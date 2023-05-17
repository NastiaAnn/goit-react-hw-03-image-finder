import React, { Component } from 'react';
import { SearchBar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import * as API from 'services/Api';
import { Modal } from './Modal/Modal';

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
    console.log(this.state.images);

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
        {isLoading && <div>Loading</div>}
        {images.length > 0 ? (
          <ImageGallery items={images} onClick={this.toggleModal} />
        ) : null}

        {showModal && (
          <Modal>
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
