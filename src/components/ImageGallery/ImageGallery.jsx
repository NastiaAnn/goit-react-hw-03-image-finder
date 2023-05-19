import { Component } from 'react';
import { Image } from 'components/Image';
import { StyledGallery } from './styled';
import { Circles } from 'react-loader-spinner';
import { fetchImages } from 'services/Api';
import { Modal } from 'components/Modal';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  static propTypes = {
    imageName: PropTypes.string.isRequired,
  };
  state = {
    images: [],
    showModal: false,
    isLoading: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    if (prevProps.imageName !== imageName) {
      this.setState({ isLoading: true, images: [] });
      fetchImages(imageName)
        .then(images => {
          this.setState({ images: images.data.hits });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  toggleModal = image => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedImage: image,
    }));
  };

  render() {
    const { isLoading, images, showModal, selectedImage } = this.state;
    return (
      <>
        <StyledGallery>
          {isLoading && (
            <Circles
              height="100"
              width="100"
              color="#004F98"
              ariaLabel="circles-loading"
              // wrapperStyle={{
              //   display: 'flex',
              //   justifyContent: 'center',
              //   alignItems: 'center',
              //   height: '50vh',
              // }}
              wrapperClass=""
              visible={true}
            />
          )}
          {images &&
            images.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <Image
                  key={id}
                  smallImgUrl={webformatURL}
                  bigImgUrl={largeImageURL}
                  imgDescr={tags}
                  handleImgClick={this.toggleModal}
                />
              );
            })}
        </StyledGallery>

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
      </>
    );
  }
}
