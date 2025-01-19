export type TEvent = {
  id: string;
  slug: string;
  title: string;
  handle: string;
  description: string;
  tags?: string[];
  thumbnail: string;
  video?: string;
  gallery?: string[];
  likes?: number;
  comments?: number;
  shared?: number;
  retweets?: number;
  participantes?: string[];
  date?: Date;
};

export type TEventProps = {
  props: TEvent[];
};
