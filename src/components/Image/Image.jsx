export const Image = ({ smallImgUrl, bigImgUrl, imgDescr }) => {
  return (
    <li>
      <img src={smallImgUrl} alt={imgDescr} />
    </li>
  );
};
