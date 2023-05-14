import React from "react";
import PictureDrop from "../PictureDrop";
import heartthumb from "../../assets/images/thumbmaskheart1.png";

const HeartTemplate = ({ frameColor, listDrop, onSubmitPicture, onDeletePicture, grayscale }) => {
  const sizeBox = { width: "76px", height: "76px" };

  return (
    <div
      className="w-5/6 h-full flex gap-3 justify-center items-center frame flex-wrap relative"
      style={{ backgroundColor: `${frameColor}` }}
    >
      <div
        className="absolute pointer-events-none w-full h-full"
        style={{
          zIndex: "3",
          backgroundImage: `url(${heartthumb})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
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

export default HeartTemplate;
