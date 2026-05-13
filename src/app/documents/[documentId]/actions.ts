'use server';




import {  ConvexHttpClient } from 'convex/browser';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { Id } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


export async function getDocument(ids: Id<"documents">[]) {
    return await convex.query(api.document.getByIds,{ids});
}

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

  const users = response.data.map((user) => {
    const name = user.fullName ?? (`${user.firstName} ${user.lastName}`.trim() || user.emailAddresses[0]?.emailAddress || 'Anonymous');
    const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = Math.abs(nameToNumber) % 360;
    const color = `hsl(${hue}, 80%, 60%)`;

    return {
      id: user.id,
      name,
      avatar: user.imageUrl,
      color,
    };
  });
  return users;
}

export async function getUsersByIds(userIds: string[]) {
  const clerk = await clerkClient();
  const response = await clerk.users.getUserList({
    userId: userIds,
  });

  const users = response.data.map((user) => {
    const name = user.fullName ?? (`${user.firstName} ${user.lastName}`.trim() || user.emailAddresses[0]?.emailAddress || 'Anonymous');
    const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = Math.abs(nameToNumber) % 360;
    const color = `hsl(${hue}, 80%, 60%)`;

    return {
      id: user.id,
      name,
      avatar: user.imageUrl,
      color,
    };
  });
  return users;
}
