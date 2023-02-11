import React from 'react';
import ImagesGrid from './ImagesGrid';

const images = [
  {
    url: 'https://api.lorem.space/image?w=500&h=500',
    prompt: 'un chat dans un champ de mais ',
  },
  {
    url: 'https://api.lorem.space/image?w=500&h=500',
    prompt: 'un chat dans un champ de mais ',
  },
  {
    url: 'https://api.lorem.space/image?w=500&h=500',
    prompt: 'un chat dans un champ de mais ',
  },
  {
    url: 'https://api.lorem.space/image?w=500&h=500',
    prompt: 'un chat dans un champ de mais ',
  },
  {
    url: 'https://api.lorem.space/image?w=500&h=500',
    prompt: 'un chat dans un champ de mais ',
  },
  {
    url: 'https://api.lorem.space/image?w=500&h=500',
    prompt: 'un chat dans un champ de mais ',
  },
  {
    url: 'https://api.lorem.space/image?w=500&h=500',
    prompt: 'un chat dans un champ de mais ',
  },
];

const Gallery = () => (
  <div className="px-4 md:px-8 lg:px-40 py-20 grid grid-cols-1 gap-2">
    <ImagesGrid orientation="left" images={images} />
    <ImagesGrid orientation="right" images={images} />
  </div>
);

export default Gallery;
