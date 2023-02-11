import React from 'react';

const ImagesGrid = ({
  orientation,
  images,
}: {
  orientation?: string;
  images: Array<{ url: string; prompt: string }>;
}) => (
  <>
    <div className="hidden md:grid grid-cols-5 gap-2 grid-rows-2 ">
      {images.map(({ url, prompt }, index) => {
        if (orientation === 'left' && index === 0) {
          return (
            <button
              type="button"
              className="w-full cursor-pointer h-full col-span-2 row-span-2 aspect-square relative"
            >
              <div className="p-4 h-full w-full absolute bg-black opacity-0   hover:opacity-100 ease-in duration-200 bg-opacity-50 flex justify-center items-center">
                <p className="font-medium text-white text-xl text-center">
                  {prompt}
                </p>
              </div>
              <img src={url} className="w-full h-full  " alt="" />
            </button>
          );
        }
        if (orientation === 'right' && index === 3) {
          return (
            <button
              type="button"
              className="w-full cursor-pointer h-full col-span-2 row-span-2 aspect-square relative"
            >
              <div className="p-4 h-full w-full absolute bg-black opacity-0   hover:opacity-100 ease-in duration-200 bg-opacity-50 flex justify-center items-center">
                <p className="font-medium text-white text-xl text-center">
                  {prompt}
                </p>
              </div>
              <img src={url} className="w-full h-full  " alt="" />
            </button>
          );
        }
        return (
          <button
            type="button"
            className="w-full cursor-pointer h-full aspect-square relative"
          >
            <div className="p-4 h-full w-full absolute bg-black opacity-0   hover:opacity-100 ease-in duration-200 bg-opacity-50 flex justify-center items-center">
              <p className="font-medium text-white text-lg text-center">
                {prompt}
              </p>
            </div>
            <img src={url} className="w-full h-full  " alt="" />
          </button>
        );
      })}
    </div>
    <div className="grid md:hidden grid-cols-2 gap-2">
      {images.map(({ url, prompt }, index) => {
        if (index < 6) {
          return (
            <button
              type="button"
              className="w-full cursor-pointer h-full aspect-square relative"
            >
              <div className="p-4 h-full w-full absolute bg-black opacity-0   hover:opacity-100 ease-in duration-200 bg-opacity-50 flex justify-center items-center">
                <p className="font-medium text-white text-lg text-center">
                  {prompt}
                </p>
              </div>
              <img src={url} className="w-full h-full" alt="" />
            </button>
          );
        }
        return null;
      })}
    </div>
  </>
);

ImagesGrid.defaultProps = {
  orientation: 'left',
};

export default ImagesGrid;
