import { GalleryItem, GalleryImage } from './styled';

export const Image = ({ smallImgUrl, bigImgUrl, imgDescr }) => {
  return (
    <GalleryItem>
      <GalleryImage src={smallImgUrl} alt={imgDescr} />
    </GalleryItem>
  );
};
