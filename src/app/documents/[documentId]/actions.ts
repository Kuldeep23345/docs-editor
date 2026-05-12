'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';

export async function getUser() {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  const response = await clerk.users.getUserList(
    sessionClaims?.org_id
      ? {
          organizationId: [sessionClaims?.org_id as string],
        }
      : undefined
  );

  const users = response.data.map((user) => ({
    id: user.id,
    name: user.fullName ?? (`${user.firstName} ${user.lastName}`.trim() || user.emailAddresses[0]?.emailAddress || 'Anonymous'),
    avatar: user.imageUrl,
  }));
  return users;
}

export async function getUsersByIds(userIds: string[]) {
  const clerk = await clerkClient();
  const response = await clerk.users.getUserList({
    userId: userIds,
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name: user.fullName ?? (`${user.firstName} ${user.lastName}`.trim() || user.emailAddresses[0]?.emailAddress || 'Anonymous'),
    avatar: user.imageUrl,
  }));
  return users;
}
