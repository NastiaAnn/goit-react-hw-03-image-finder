import { Component } from 'react';
import { Image } from 'components/Image';
import { StyledGallery } from './styled';
import { Circles } from 'react-loader-spinner';
import { LoadMoreBtn } from 'components/LoadMoreBtn';
import { PixabayApi } from 'services/Api';
import { Modal } from 'components/Modal';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    const { page } = this.state;

    if (prevProps.imageName !== imageName && imageName.trim() !== '') {
      this.setState({
        isLoading: true,
        images: [],
        isLoadedBtn: false,
        page: 1,
      });

      this.handleAPIRequest(imageName, 1);
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ isLoading: true });
      this.handleAPIRequest(imageName, page);
    }
  }

  handleAPIRequest = (imageName, page) => {
    try {
      return pixabayApi.fetchImages(imageName, page).then(images => {
        this.handleAPIRequestChecking(images);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  handleAPIRequestChecking = images => {
    if (images.data.totalHits === 0) {
      this.setState({ isLoading: false });
      return Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (
      images.data.totalHits <= 12 ||
      images.data.totalHits === 0 ||
      images.data.totalHits - pixabayApi.count <= pixabayApi.count
    ) {
      return this.setState({
        images: images.data.hits,
        isLoading: false,
        isLoadedBtn: false,
        page: 1,
      });
    }
    this.setState(prevState => ({
      images: [...prevState.images, ...images.data.hits],
      isLoading: false,
      isLoadedBtn: true,
      page: this.state.page,
    }));
  };

  handleLoadMoreBtnClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = image => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedImage: image,
    }));
  };

  render() {
    const { isLoading, images, showModal, selectedImage, isLoadedBtn } =
      this.state;

    return (
      <>
        {images.length > 0 && (
          <StyledGallery>
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
        )}
        {isLoading && (
          <Circles
            height="100"
            width="100"
            color="#004F98"
            ariaLabel="circles-loading"
            wrapperStyle={{
              position: 'fixed',
              display: 'flex',
              top: 0,
              bottom: 100,
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
