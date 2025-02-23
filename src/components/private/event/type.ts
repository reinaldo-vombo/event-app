export type TEvent = {
  id: string;
  slug: string;
  title: string;
  handle: string;
  description: string;
  tags?: string[];
  thumbnail: string;
  category: string;
  video?: string;
  gallery?: string[];
  likes?: number;
  comments?: number;
  status: string;
  tickets: string;
  price: {
    title: string;
    price: string;
  }[];
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  guests?: {
    name: string;
    avatar: string;
  }[];
  shared?: number;
  retweets?: number;
  date?: Date;
};

export type TEventProps = {
  props: TEvent[];
};
