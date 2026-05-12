import { auth, currentUser } from '@clerk/nextjs/server';
import { Liveblocks } from '@liveblocks/node';
import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return new Response('Unauthorized', { status: 401 });
  }
  const user = await currentUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  const { room } = await request.json();

  const document = await convex.query(api.document.getById, { id: room });
  if (!document) {
    return new Response('Document not found', { status: 404 });
  }

  const isOwner = (document.ownerId = user.id);
  const isOrganizationMemeber = document.organizationId === sessionClaims.org_id;

  if (!isOwner && !isOrganizationMemeber) {
    return new Response('Unauthorized', { status: 401 });
  }
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName ?? 'Anonymous',
      avatar: user.imageUrl ?? '',
    },
  });
  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
