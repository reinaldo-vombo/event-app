'use server';
import { prisma } from '../db/client';

export const followUser = async (followerId: string, followingId: string) => {
  if (followerId === followingId) {
    throw new Error('You cannot follow yourself.');
  }

  const follow = await prisma.follower.create({
    data: {
      followerId,
      followingId,
    },
  });

  return follow;
};
export const unfollowUser = async (followerId: string, followingId: string) => {
  const unfollow = await prisma.follower.deleteMany({
    where: {
      followerId,
      followingId,
    },
  });

  return unfollow;
};
