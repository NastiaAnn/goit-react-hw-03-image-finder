import { Component } from 'react';
import { Image } from 'components/Image/Image';

export class ImageGallery extends Component {
  render() {
    return (
      <ul>
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
      </ul>
    );
  }
}
