import { prisma } from './client';

export const getAllEvents = async () => {
  const events = await prisma.event.findMany({});
  return events.map((event) => ({
    ...event,
    price:
      typeof event.price === 'string' ? JSON.parse(event.price) : event.price,
    guests:
      typeof event.price === 'string' ? JSON.parse(event.price) : event.price,
    gallery:
      typeof event.gallery === 'string'
        ? JSON.parse(event.gallery)
        : event.gallery,
    tags: Array.isArray(event.tags) ? (event.tags as string[]) : [],
  }));
};
export const getEventBySlug = async (slug: string) => {
  const event = await prisma.event.findUnique({
    where: {
      slug,
    },
  });

  if (!event) {
    throw new Error('Product not found');
  }

  return {
    ...event,
    tags: Array.isArray(event.tags) ? (event.tags as string[]) : [],
    gallery: Array.isArray(event.gallery) ? (event.gallery as string[]) : [],
    price:
      typeof event.price === 'string' ? JSON.parse(event.price) : event.price,
  };
};
export const getEventsByOrganizer = async (id: string | undefined) => {
  const events = await prisma.event.findMany({
    where: {
      organizerId: id,
    },
  });

  if (events.length === 0) {
    throw new Error('No events found for this user');
  }

  return events.map((event) => ({
    ...event,
    price:
      typeof event.price === 'string' ? JSON.parse(event.price) : event.price,
    guests:
      typeof event.price === 'string' ? JSON.parse(event.price) : event.price,
    gallery:
      typeof event.gallery === 'string'
        ? JSON.parse(event.gallery)
        : event.gallery,
    tags: Array.isArray(event.tags) ? (event.tags as string[]) : [],
  }));
};
export const getEventsGuestById = async (id: string | undefined) => {
  const guests = await prisma.guest.findMany({
    where: {
      id,
    },
  });


  return guests.map((guest) => ({
    ...guest,
    avatar: Array.isArray(guest.avatar) ? (guest.avatar as string[]) : [],
  }));
};
