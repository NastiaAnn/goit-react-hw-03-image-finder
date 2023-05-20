import { Component } from 'react';
import { Image } from 'components/Image';
import { StyledGallery } from './styled';
import { Circles } from 'react-loader-spinner';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
// import { fetchImages } from 'services/Api';
import { PixabayApi } from 'services/Api';
import { Modal } from 'components/Modal';
import PropTypes from 'prop-types';

const pixabayApi = new PixabayApi();

export class ImageGallery extends Component {
  static propTypes = {
    imageName: PropTypes.string.isRequired,
  };
  state = {
    images: [],
    showModal: false,
    isLoading: false,
    selectedImage: null,
    isLoadedBtn: false,
  };

  handleAPIRequest = imageName => {
    return pixabayApi
      .fetchImages(imageName)
      .then(images => {
        console.log(images.data);
        if (images.data.totalHits === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        if (images.data.totalHits <= 12 || images.data.totalHits === 0) {
          return this.setState({
            images: images.data.hits,
            isLoadedBtn: false,
          });
        }
        this.setState({
          images: images.data.hits,
          isLoadedBtn: true,
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    if (prevProps.imageName !== imageName && imageName.trim() !== '') {
      this.setState({ isLoading: true, images: [], isLoadedBtn: false });
      this.handleAPIRequest(imageName);
    }
  }

  toggleModal = image => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedImage: image,
    }));
  };

  handleLoadMoreBtnClick = () => {
    pixabayApi.page += 1;
    const { imageName } = this.props;
    pixabayApi.fetchImages(imageName).then(images => {
      if (images.data.totalHits - pixabayApi.count <= pixabayApi.count) {
        return this.setState(prevState => ({
          images: [...prevState.images, ...images.data.hits],
          isLoading: false,
          isLoadedBtn: false,
        }));
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...images.data.hits],
      }));
    });
  };

  render() {
    const { isLoading, images, showModal, selectedImage, isLoadedBtn } =
      this.state;
    return (
      <>
        <StyledGallery>
          {isLoading && (
            <Circles
              height="100"
              width="100"
              color="#004F98"
              ariaLabel="circles-loading"
              wrapperStyle={{
                position: 'absolute',
                display: 'flex',
                top: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
              }}
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

        {isLoadedBtn && (
          <LoadMoreBtn handleLoadMoreBtnClick={this.handleLoadMoreBtnClick} />
        )}

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
