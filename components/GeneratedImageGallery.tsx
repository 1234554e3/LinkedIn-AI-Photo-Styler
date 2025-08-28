
import React from 'react';
import { GeneratedImage } from '../types';
import { DownloadIcon } from './icons/Icons';

interface GeneratedImageGalleryProps {
  images: GeneratedImage[];
  onReset: () => void;
}

const GeneratedImageGallery: React.FC<GeneratedImageGalleryProps> = ({ images, onReset }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Your LinkedIn-ready Photos</h2>
      <p className="text-slate-600 mb-8">Click the download button on your favorite style to save it.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {images.map((image) => (
          <div key={image.style} className="group relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
            <img src={image.url} alt={`Generated style: ${image.style}`} className="w-full h-full object-cover aspect-square" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-100 flex flex-col justify-end p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-bold">{image.style}</h3>
                <a
                  href={image.url}
                  download={`linkedin-photo-${image.style.toLowerCase().replace(' ', '-')}.jpg`}
                  className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                  aria-label={`Download ${image.style} style`}
                >
                  <DownloadIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={onReset}
        className="mt-12 bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-primary-hover transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Try Another Photo
      </button>
    </div>
  );
};

export default GeneratedImageGallery;
