import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { RiCloseFill } from "react-icons/ri";

const PictureDrop = ({ id, url, onSubmitPicture, onDeletePicture, grayscale, handleCloseDialog, sizeBox }) => {
  const scrollRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [screenXmouseDown, setScreenXmouseDown] = useState(0);
  const [state, setState] = useState({
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  });

  useEffect(() => {
    window.addEventListener("click", (e) => handleCloseDialog(scrollRef.current, showMenu, setShowMenu, e));

    return () => {
      window.removeEventListener("click", handleCloseDialog);
    };
  }, [showMenu]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.url, id),
    // drop: (item) => console.log(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (urlSubmit, id) => {
    onSubmitPicture(urlSubmit, id);
  };

  const handleDelete = (id) => {
    onDeletePicture(id);
  };

  const onMouseDown = (e) => {
    setState({ ...state, isScrolling: true, clientX: e.clientX });
    setScreenXmouseDown(e.clientX); //check show menu
  };

  const onMouseUp = (e) => {
    setState({ ...state, isScrolling: false });
    if (e.clientX === screenXmouseDown && url) {
      setShowMenu((prev) => !prev);
    }
  };

  const onMouseMove = (e) => {
    if (state.isScrolling) {
      if (state.scrollX < 0) {
        state.scrollX = 0;
        return;
      }
      if (state.scrollX + scrollRef.current.clientWidth > scrollRef.current.scrollWidth) {
        state.scrollX = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        return;
      }
      scrollRef.current.scrollLeft = state.scrollX + state.clientX - e.clientX;
      state.scrollX = state.scrollX + state.clientX - e.clientX;
      state.clientX = e.clientX;
    }
  };

  return (
    <div
      style={{ width: `${sizeBox.width}`, height: `${sizeBox.height}`, zIndex: "2" }}
      className={`${isOver ? "bg-[#dddddd]" : "bg-[rgba(225,225,225,0.6)]"} ${url && "cursor-move"} relative`}
    >
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        draggable="false"
        className="w-full h-full overflow-x-hidden"
      >
        <div ref={drop} className="w-full h-full">
          {url ? (
            <img draggable="false" src={url} alt="" className={`w-auto h-full ${grayscale && "grayscale"}`} />
          ) : (
            <label draggable="false" htmlFor="upload" className="w-full h-full block"></label>
          )}
        </div>
      </div>
      <div
        className={`absolute w-full top-[-40px] left-0 cursor-pointer border-2 border-solid border-black px-2 py-2 bg-[#525151] rounded text-white transition-opacity flex justify-end ${
          showMenu ? "opacity-1 visible" : "opacity-0 invisible"
        }`}
      >
        <RiCloseFill onClick={() => handleDelete(id)}></RiCloseFill>
      </div>
    </div>
  );
};

export default PictureDrop;
