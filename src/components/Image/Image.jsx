import PropTypes from 'prop-types';

import { GalleryItem, GalleryImage } from './styled';

export const Image = ({ smallImgUrl, bigImgUrl, imgDescr, onClick }) => {
  return (
    <GalleryItem>
      <GalleryImage src={smallImgUrl} alt={imgDescr} onClick={onClick} />
    </GalleryItem>
  );
};

Image.prototype = {
  key: PropTypes.number.isRequired,
  smallImgUrl: PropTypes.string.isRequired,
  bigImgUrl: PropTypes.string.isRequired,
  imgDescr: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
