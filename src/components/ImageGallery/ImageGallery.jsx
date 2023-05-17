import { Component } from 'react';
import { Image } from 'components/Image/Image';
import { StyledGallery } from './styled';

export class ImageGallery extends Component {
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
            />
          );
        })}
      </StyledGallery>
    );
  }
}
