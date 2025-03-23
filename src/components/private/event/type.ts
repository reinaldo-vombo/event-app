export type TEvent = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags?: string[];
  thumbnail: string;
  category: string;
  video: string | null;
  gallery?: string[];
  likes?: number;
  comments?: number;
  status: string;
  tickets: number;
  price: {
    title: string;
    price: string;
  }[];
  startDate: Date;
  endDate: Date | null;
  latitude: number;
  longitude: number;
  locationName: string;
  organizerId?: string;
  guests?: {
    name: string;
    avatar: string;
  }[];
};

export type TEventProps = {
  props: TEvent[];
};
