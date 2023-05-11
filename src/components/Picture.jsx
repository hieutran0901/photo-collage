import React from "react";
import { useDrag } from "react-dnd";

const Picture = ({ name, url }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { url },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging,
    }),
  }));

  return <img className="w-full h-2/4" ref={drag} src={url} alt="" draggable={true} />;
};

export default Picture;
