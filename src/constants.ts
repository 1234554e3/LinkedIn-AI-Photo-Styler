import { StylePrompt, Theme } from './types';

export const STYLING_PROMPTS: StylePrompt[] = [
  {
    style: "Official",
    instruction: "Generate a professional headshot suitable for a corporate environment like LinkedIn. The person should be wearing business casual attire. The background should be a neutral, slightly out-of-focus office or studio setting. The lighting should be soft and professional."
  },
  {
    style: "Formal Suit",
    instruction: "Recreate this person in a highly professional headshot wearing a formal dark suit and tie (for men) or a professional blazer (for women). The background should be a bright, clean, modern studio backdrop. The expression should be confident and approachable."
  },
  {
    style: "Creative",
    instruction: "Generate a stylish but professional photo with a modern creative look, suitable for a tech or design role. The person could be against a textured wall or a minimalist, artistically lit background. The attire should be smart and trendy. The overall mood should be innovative and forward-thinking."
  },
  {
    style: "Casual",
    instruction: "Create a clean, approachable, and casual profile photo. The person should be wearing a simple, high-quality shirt or sweater. The background should be a natural outdoor setting, like a park or a pleasant urban street, with a shallow depth of field. The lighting should look natural and warm."
  }
];

export const THEMES: Theme[] = [
  {
    name: 'Blue',
    displayColor: '#2563EB',
    colors: {
      primary: '37 99 235',
      'primary-hover': '29 78 216',
      'primary-light': '219 234 254',
    },
  },
  {
    name: 'Indigo',
    displayColor: '#4F46E5',
    colors: {
      primary: '79 70 229',
      'primary-hover': '67 56 202',
      'primary-light': '224 231 255',
    },
  },
  {
    name: 'Teal',
    displayColor: '#0D9488',
    colors: {
      primary: '13 148 136',
      'primary-hover': '15 118 110',
      'primary-light': '204 251 241',
    },
  },
  {
    name: 'Rose',
    displayColor: '#E11D48',
    colors: {
      primary: '225 29 72',
      'primary-hover': '190 18 60',
      'primary-light': '255 228 230',
    },
  },
];
