import PropTypes from 'prop-types';

import { GalleryItem, GalleryImage } from './styled';

<<<<<<< Updated upstream
export const Image = ({ smallImgUrl, bigImgUrl, imgDescr, handleImgClick }) => {
  return (
    <GalleryItem
      onClick={() =>
        handleImgClick({ largeImageURL: bigImgUrl, tags: imgDescr })
      }
    >
=======
export const Image = ({ smallImgUrl, bigImgUrl, imgDescr }) => {
  return (
    <GalleryItem>
>>>>>>> Stashed changes
      <GalleryImage src={smallImgUrl} alt={imgDescr} />
    </GalleryItem>
  );
};

Image.prototype = {
  key: PropTypes.number.isRequired,
  smallImgUrl: PropTypes.string.isRequired,
  bigImgUrl: PropTypes.string.isRequired,
  imgDescr: PropTypes.string.isRequired,
  handleImgClick: PropTypes.func.isRequired,
};
