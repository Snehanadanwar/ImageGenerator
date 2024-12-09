import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";
const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="mx-2rounded-xl group position-relative shadow-card card-hover card p-3">
      <img
        className="w-100 h-100 object-fit-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="mt-3">
        <p className="text-dark small overflow-auto prompt">{prompt}</p>
        <div className="mt-3 d-flex justify-content-between align-items-center gap-2 mb-auto">
          <div className="d-flex align-items-center gap-2">
            <div
              style={{ width: 40, height: 40 + "px" }}
              className="rounded-circle object-cover bg-success d-flex justify-content-center align-items-center text-white small font-weight-bold"
            >
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-0"
          >
            <img
              src={download}
              alt="download"
              style={{ width: 40, height: 40 + "px" }}
              className="object-fit-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;