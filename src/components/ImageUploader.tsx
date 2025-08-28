import React, { useCallback, useState } from 'react';
import { UploadCloudIcon } from './icons/Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileValidation = (file: File): boolean => {
    const acceptedTypes = ['image/jpeg', 'image/png'];
    const maxSizeMB = 10;
    
    if (!acceptedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a JPG or PNG image.');
      return false;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (handleFileValidation(file)) {
        onImageUpload(file);
      }
    }
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [onImageUpload]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`w-full max-w-lg p-8 border-2 border-dashed rounded-xl transition-colors duration-300 ${isDragging ? 'border-primary bg-primary-light/50' : 'border-slate-300 bg-slate-50'}`}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/jpeg,image/png"
          onChange={(e) => handleFileChange(e.target.files)}
        />
        <label htmlFor="file-upload" className="flex flex-col items-center justify-center text-center cursor-pointer">
          <UploadCloudIcon className={`w-16 h-16 mb-4 transition-colors duration-300 ${isDragging ? 'text-primary' : 'text-slate-400'}`} />
          <p className="text-xl font-semibold text-slate-700">Drag & drop your photo here</p>
          <p className="text-slate-500 mt-1">or <span className="text-primary font-medium">click to browse</span></p>
          <p className="text-xs text-slate-400 mt-4">PNG or JPG (max 10MB)</p>
        </label>
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ImageUploader;
