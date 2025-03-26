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

export const PATH = '/api/uploads/';
export const PRIVE_ROUTES = {
  root: '/party-twon',
  create_event: '/party-twon/create-event',
  creator: '/party-twon/creator/',
  share: `${process.env.NEXT_PUBLIC_URL}/events/`,
};
export const ROOT_ROUTES = {
  root: '/',
  login: '/auth/login',
  register: '/auth/register',
  forgot: '/auth/forgot-password',
  reset: '/auth/reset-password',
};

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
export const CATEGORYS = [
  {
    id: '1',
    label: 'Conferência & Workshop',
    value: 'conferencia & workshop',
  },
  {
    id: '2',
    label: 'Concerto & Show',
    value: 'concerto & show',
  },
  {
    id: '3',
    label: 'Corporativo',
    value: 'corporativo',
  },
  {
    id: '4',
    label: 'Festas & Festivais',
    value: 'festas & festivais',
  },
  {
    id: '5',
    label: 'Formação',
    value: 'formacao',
  },
];
export const STATUS = [
  {
    id: '1',
    label: 'Publico',
    value: 'publicado',
  },
  {
    id: '2',
    label: 'Privado',
    value: 'privado',
  },
];
export const ROLE = [
  { id: '1', label: 'ORGANIZER', value: 'ORGANIZER' },
  { id: '2', label: 'PARTICIPANT', value: 'PARTICIPANT' },
];
export const eventTags = [
  { value: 'eventos', label: 'Eventos' },
  { value: 'networking', label: 'Networking' },
  { value: 'ingressos', label: 'Ingressos' },
  { value: 'shows', label: 'Shows' },
  { value: 'conferencias', label: 'Conferências' },
  { value: 'festivais', label: 'Festivais' },
  { value: 'palestras', label: 'Palestras' },
  { value: 'comunidade', label: 'Comunidade' },
  { value: 'experiencias', label: 'Experiências' },
  { value: 'agenda-eventos', label: 'Agenda de Eventos' },
  { value: 'meetups', label: 'Meetups' },
  { value: 'workshops', label: 'Workshops' },
  { value: 'festas', label: 'Festas' },
  { value: 'lancamentos', label: 'Lançamentos' },
  { value: 'webinars', label: 'Webinars' },
  { value: 'artes-cultura', label: 'Artes e Cultura' },
  { value: 'esportes', label: 'Esportes' },
  { value: 'educacao', label: 'Educação' },
  { value: 'feiras-exposicoes', label: 'Feiras e Exposições' },
  { value: 'musica-ao-vivo', label: 'Música ao Vivo' },
];
