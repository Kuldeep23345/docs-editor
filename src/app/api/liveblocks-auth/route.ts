import { auth, currentUser } from '@clerk/nextjs/server';
import { Liveblocks } from '@liveblocks/node';
import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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
}
