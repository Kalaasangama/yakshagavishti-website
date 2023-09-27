import React from "react";

interface CardProps {
  title: string;
  copy: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ title, copy, image }) => {
  return (
    <div className="card mx-auto max-w-2xl p-4">
      <div className="max-w-sm rounded-2xl border border-gray-200 bg-white shadow-md hover:scale-105 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <a href="#">
          <img
            className="h-3/4 rounded-t-lg object-contain"
            src={image}
            alt={title}
          />
        </a>
        <div className="content visibility-hidden z-index-1 position-absolute width-full height-full left-0 top-0 p-5 opacity-0">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {copy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
