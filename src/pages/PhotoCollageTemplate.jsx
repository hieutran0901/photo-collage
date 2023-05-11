import React from "react";
import listTemplates from "../assets/fake-data/template";
import { useNavigate } from "react-router-dom";

const PhotoCollageTemplate = ({ setListDrop, setTemplate }) => {
  const navigate = useNavigate();
  return (
    <section className="max-w-screen-lg mx-auto text-center my-3">
      <span className="text-4xl text-[#4e8028] font-medium">Photo Collage Templates</span>
      <ul className="flex gap-2 mt-5">
        {listTemplates.map((item) => (
          <li className="border-2 border-solid border-gray-300 w-1/2 pb-2" key={item.type}>
            <div className="min-h-[140px] flex justify-center gap-2">
              <img src={item.image} alt="" className="" />
              <p className="flex items-center">{item.description}</p>
            </div>
            <p className="font-semibold text-lg">{item.name}</p>
            <button
              onClick={() => {
                setListDrop(item.data);
                setTemplate(item.type);
                navigate("/");
              }}
              className="text-white bg-[#82b338] rounded px-2 py-1 hover:bg-green-800 duration-200"
            >
              Create Collage
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PhotoCollageTemplate;
