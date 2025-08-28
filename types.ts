export interface StylePrompt {
  style: string;
  instruction: string;
}

export interface GeneratedImage {
  style: string;
  prompt: string;
  url: string;
}

export interface Theme {
  name: string;
  displayColor: string;
  colors: {
    primary: string;
    'primary-hover': string;
    'primary-light': string;
  };
}