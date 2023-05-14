import React from "react";
import PictureDrop from "../PictureDrop";

const NormalTemplate = ({ frameColor, listDrop, onSubmitPicture, onDeletePicture, grayscale }) => {
  const sizeBox = { width: "208px", height: "176px" };

  return (
    <div
      className="w-full h-full flex gap-3 justify-center items-center frame"
      style={{ backgroundColor: `${frameColor}` }}
    >
      {listDrop.map((item) => (
        <PictureDrop
          sizeBox={sizeBox}
          key={item.id}
          id={item.id}
          url={item.url}
          grayscale={grayscale}
          onSubmitPicture={onSubmitPicture}
          onDeletePicture={onDeletePicture}
        />
      ))}
    </div>
  );
};

export default NormalTemplate;
