import {
  demo1,
  demo2,
  demo3,
  demo4,
  demo5,
  demo6,
  demo7,
  demo8,
} from '@/assets/images';

export const IMAGE_GALLERY = [
  { id: 1, image: demo1 },
  { id: 2, image: demo2 },
  { id: 3, image: demo3 },
  { id: 4, image: demo4 },
  { id: 5, image: demo5 },
  { id: 6, image: demo6 },
  { id: 7, image: demo7 },
  { id: 8, image: demo8 },
];

export const FOLLOW_SUGGESTION = [
  {
    id: '1',
    name: 'Galatasaray',
    avatar: '/avatar.jpg',
    handle: 'GalatasaraySK',
  },
  {
    id: '2',
    name: 'Paris Saint-Germain',
    avatar: '/avatar.jpg',
    handle: 'PSG_inside',
  },
  {
    id: '3',
    name: 'Twitter Design',
    avatar: '/avatar.jpg',
    handle: 'TwitterDesign',
  },
];
export const initialState = {
  message: '',
  error: false,
  status: 0,
  success: undefined,
  fields: undefined,
  issues: [],
};
