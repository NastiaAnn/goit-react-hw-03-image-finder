import { Component } from 'react';
import { Image } from 'components/Image';
import { StyledGallery } from './styled';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ).isRequired,
    onClick: PropTypes.func.isRequired,
  };
  handleImageClick = image => {
    this.props.onClick(image);
  };

  render() {
    return (
      <StyledGallery>
        {this.props.items.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <Image
              key={id}
              smallImgUrl={webformatURL}
              bigImgUrl={largeImageURL}
              imgDescr={tags}
              onClick={() =>
                this.handleImageClick({ id, webformatURL, largeImageURL, tags })
              }
            />
          );
        })}
      </StyledGallery>
    );
  }
}
