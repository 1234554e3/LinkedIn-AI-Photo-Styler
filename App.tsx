import React, { useState, useCallback, useEffect } from 'react';
import { GeneratedImage, StylePrompt, Theme } from './types';
import { STYLING_PROMPTS, THEMES } from './constants';
import { generateStyledImage } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import GeneratedImageGallery from './components/GeneratedImageGallery';
import LoadingIndicator from './components/LoadingIndicator';
import Step from './components/Step';
import { UploadIcon, SparklesIcon, DownloadIcon } from './components/icons/Icons';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (name: string) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-slate-500 mr-2">Theme:</span>
      {THEMES.map((t) => (
        <button
          key={t.name}
          onClick={() => onThemeChange(t.name)}
          className={`w-6 h-6 rounded-full border-2 transition-transform duration-200 transform hover:scale-110 ${
            currentTheme.name === t.name ? 'border-primary' : 'border-slate-300'
          }`}
          style={{ backgroundColor: t.displayColor }}
          aria-label={`Switch to ${t.name} theme`}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [themeName, setThemeName] = useState<string>(THEMES[0].name);

  useEffect(() => {
    const currentTheme = THEMES.find((t) => t.name === themeName) || THEMES[0];
    const root = window.document.documentElement;
    
    Object.entries(currentTheme.colors).forEach(([name, value]) => {
      root.style.setProperty(`--color-${name}`, value);
    });

  }, [themeName]);

  const handleThemeChange = (name: string) => {
    const newTheme = THEMES.find((t) => t.name === name);
    if (newTheme) {
      setThemeName(name);
    }
  };

  const handleImageUpload = useCallback(async (file: File) => {
    setOriginalImage(file);
    setGeneratedImages([]);
    setError(null);
    setIsLoading(true);

    try {
      const newImages: GeneratedImage[] = [];
      for (const prompt of STYLING_PROMPTS) {
        setLoadingMessage(`Generating "${prompt.style}" style...`);
        const base64Image = await generateStyledImage(file, prompt.instruction);
        if (base64Image) {
          const newImage: GeneratedImage = {
            style: prompt.style,
            prompt: prompt.instruction,
            url: `data:image/jpeg;base64,${base64Image}`,
          };
          newImages.push(newImage);
          setGeneratedImages([...newImages]);
        }
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  const resetState = () => {
    setOriginalImage(null);
    setGeneratedImages([]);
    setError(null);
    setIsLoading(false);
  };

  const currentTheme = THEMES.find((t) => t.name === themeName) || THEMES[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
            LinkedIn AI Photo Styler
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Transform one photo into multiple professional LinkedIn-ready styles in seconds.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
           <Step 
            icon={<UploadIcon />}
            title="1. Upload Your Photo"
            description="Choose a clear, front-facing photo. Good lighting works best!"
          />
           <Step 
            icon={<SparklesIcon />}
            title="2. AI Generates Variants"
            description="Our AI creates official, formal, creative, and casual styles for you."
          />
           <Step 
            icon={<DownloadIcon />}
            title="3. Download & Use"
            description="Pick your favorites and update your LinkedIn profile instantly."
          />
        </section>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-slate-200">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {isLoading ? (
            <LoadingIndicator message={loadingMessage} generatedCount={generatedImages.length} totalCount={STYLING_PROMPTS.length} />
          ) : generatedImages.length > 0 ? (
             <GeneratedImageGallery images={generatedImages} onReset={resetState} />
          ) : (
            <ImageUploader onImageUpload={handleImageUpload} />
          )}
        </div>

        <footer className="text-center mt-12 text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} LinkedIn AI Photo Styler. All rights reserved.</p>
          <ThemeSwitcher currentTheme={currentTheme} onThemeChange={handleThemeChange} />
        </footer>
      </main>
    </div>
  );
};

export default App;