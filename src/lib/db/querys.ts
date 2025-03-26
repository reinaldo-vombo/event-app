import { prisma } from './client';

export const getAllEvents = async () => {
  const events = await prisma.event.findMany({
    include: {
      organizer: {
        select: {
          id: true,
          name: true,
          image: true, // Assuming `avatar` exists in User model
        },
      },
    },
  });
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

export const getEventById = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  if (!event) {
    throw new Error('Event not found');
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
      eventId: id,
    },
  });

  return guests;
};
export const getUserById = async (id: string | undefined) => {
  const creator = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return creator;
};
export const getUsersByEventId = async (eventId: string | undefined) => {
  const users = await prisma.user.findMany({
    where: {
      sales: {
        some: {
          eventId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return users;
};
export const isFollowing = async (followerId: string, followingId: string) => {
  const existingFollow = await prisma.follower.findUnique({
    where: {
      followerId_followingId: { followerId, followingId },
    },
  });

  return !!existingFollow;
};
//This function gets the list of users who follow a specific user.
export const getFollowers = async (userId: string) => {
  return await prisma.follower.findMany({
    where: { followingId: userId },
    include: {
      follower: {
        select: { id: true, name: true, email: true }, // Select needed fields
      },
    },
  });
};
//This function gets the list of users that a specific user is following.
export const getFollowing = async (userId: string) => {
  return await prisma.follower.findMany({
    where: { followerId: userId },
    include: {
      following: {
        select: { id: true, name: true, email: true },
      },
    },
  });
};
