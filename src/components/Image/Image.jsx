import { GalleryItem, GalleryImage } from './styled';

export const Image = ({ smallImgUrl, bigImgUrl, imgDescr, onClick }) => {
  return (
    <GalleryItem>
      <GalleryImage src={smallImgUrl} alt={imgDescr} onClick={onClick} />
    </GalleryItem>
  );
};
