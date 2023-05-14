import React, { useEffect, useRef, useState } from "react";
import "../styles/photocollagemaker.scss";
import {
  RiSave3Fill,
  RiAddFill,
  RiCloseFill,
  RiEraserFill,
  RiMicrosoftFill,
  RiImage2Fill,
  RiEye2Fill,
} from "react-icons/ri";
import Picture from "../components/Picture";
import { useNavigate } from "react-router-dom";
import listColor from "../assets/fake-data/listColor";
import NormalTemplate from "../components/UI/NormalTemplate";
import HeartTemplate from "../components/UI/HeartTemplate";

const PhotoCollageMake = ({ listDrop, setListDrop, template }) => {
  const navigate = useNavigate();
  const refMenuBg = useRef();
  const [grayscale, setGrayscale] = useState(false);
  const [showMenuBg, setShowMenuBg] = useState(false);
  const [frameColor, setFrameColor] = useState("#ffffff");
  const [listImgUpLoad, setListImgUpload] = useState([]);

  const handleCloseDialog = (e) => {
    console.log("a");
    if (showMenuBg) {
      if (refMenuBg.current) {
        const dialogDimensions = refMenuBg.current.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          setShowMenuBg(false);
        }
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleCloseDialog);
    return () => {
      document.body.removeEventListener("click", handleCloseDialog);
    };
  }, [showMenuBg]);

  const onSubmitPicture = (picture, idDrop) => {
    setListDrop((prev) => prev.map((item) => (item.id === idDrop ? { ...item, url: picture } : item)));
  };

  const onDeletePicture = (id) => {
    setListDrop((prev) => prev.map((item) => (item.id === id ? { ...item, url: "" } : item)));
  };

  const handleUpdateImage = (e) => {
    const checkDuplicateImg = (nameFile) => {
      for (let index in listImgUpLoad) {
        if (listImgUpLoad[index].name === nameFile) {
          return true;
        }
      }
      return false;
    };
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
    } else {
      return;
    }
    if (!checkDuplicateImg(file.name)) {
      setListImgUpload([...listImgUpLoad, file]);
    }
  };

  const handleDeleteList = (name) => {
    setListImgUpload(listImgUpLoad.filter((item) => (item.name !== name ? item : URL.revokeObjectURL(item.preview))));
  };

  return (
    <>
      <section className="max-w-screen-lg mx-auto text-center my-3">
        <span className="text-4xl text-[#4e8028] font-medium">Photo Collage Maker</span>
        <div className="collage-designer mt-4 flex justify-center flex-wrap">
          <input type="file" onChange={handleUpdateImage} id="upload" className="hidden" />
          <label className="w-3/12 whitespace-nowrap" htmlFor="upload">
            <RiAddFill className=" text-xl"></RiAddFill> Add photos ...
          </label>

          <button className="whitespace-nowrap icon_save">
            <RiSave3Fill></RiSave3Fill>
          </button>
          <button
            className="whitespace-nowrap"
            onClick={() => {
              setListDrop((prev) => prev.map((item) => ({ ...item, url: "" })));
            }}
          >
            Empty <RiEraserFill className="inline text-xl" style={{ verticalAlign: "-4px" }}></RiEraserFill>
          </button>
          <button className="whitespace-nowrap" onClick={() => navigate("/photo-collage-templates")}>
            Templates <RiMicrosoftFill className="inline text-xl" style={{ verticalAlign: "-4px" }}></RiMicrosoftFill>
          </button>
          <div ref={refMenuBg} className="relative">
            <button
              className="whitespace-nowrap"
              onClick={() => {
                setShowMenuBg((prev) => !prev);
              }}
            >
              BackGround <RiImage2Fill className="inline text-xl" style={{ verticalAlign: "-4px" }}></RiImage2Fill>
            </button>
            <div
              className={`menu_background absolute w-[170px] h-[180px] bg-white top-[55px] left-[-14px] z-10 ${
                showMenuBg ? "block" : "hidden"
              }`}
            >
              <span className="py-3 block text-gray-500">Background Colour</span>
              <div className="px-7">
                <ul className="flex gap-1 flex-wrap justify-center">
                  {listColor.map((item) => (
                    <li
                      key={item.color}
                      onClick={() => {
                        setFrameColor(item.color);
                        setShowMenuBg(false);
                      }}
                      className="w-[23px] h-[23px] rounded cursor-pointer border-2 border-solid border-gray-500"
                      style={{ backgroundColor: `${item.color}` }}
                    ></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <button onClick={() => setGrayscale(!grayscale)} className="whitespace-nowrap">
            B&W/Colour <RiEye2Fill className="inline text-xl" style={{ verticalAlign: "-4px" }}></RiEye2Fill>
          </button>
        </div>
      </section>

      <section className="max-w-screen-lg mx-auto gap-3 mt-2 md:flex overflow-x-auto" style={{ minHeight: "26rem" }}>
        <div className="border-dashed border-2 border-[rgba(149,148,148,0.6)] overflow-y-auto md:w-1/4 min-w-[200px]">
          {listImgUpLoad.length === 0 ? (
            <>
              <label
                htmlFor="upload"
                className="bg-gray-200 w-full h-full flex justify-center items-center px-10 text-center text-lg text-slate-400"
              >
                Simply drag and drop your photos here
              </label>
            </>
          ) : (
            <ul className="flex flex-wrap gap-1 p-3">
              {listImgUpLoad.map((item) => (
                <li
                  key={item.name}
                  className="w-[68px] h-[68px] flex items-center border-solid border-2 border-[#a8a8a8] relative"
                >
                  <Picture name={item.name} url={item.preview} />
                  <span
                    onClick={() => handleDeleteList(item.name)}
                    className="absolute top-0 right-0 cursor-pointer opacity-50"
                  >
                    <RiCloseFill></RiCloseFill>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="editor flex justify-center items-center p-8 md:w-3/4 min-w-[759px]">
          {template === "normalTemplate" ? (
            <NormalTemplate
              frameColor={frameColor}
              listDrop={listDrop}
              onSubmitPicture={onSubmitPicture}
              onDeletePicture={onDeletePicture}
              grayscale={grayscale}
            />
          ) : (
            <HeartTemplate
              frameColor={frameColor}
              listDrop={listDrop}
              onSubmitPicture={onSubmitPicture}
              onDeletePicture={onDeletePicture}            
              grayscale={grayscale}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default PhotoCollageMake;
