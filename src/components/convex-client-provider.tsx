'use client';

import { ReactNode } from 'react';
import { ClerkProvider, useAuth,SignIn } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient, AuthLoading, Authenticated, Unauthenticated } from 'convex/react';
import FullScreenLoader from './fullscreen-loader';

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file');
}
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center justify-center min-h-screen ">
            <SignIn routing="hash"/>
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullScreenLoader label='Auth Loading'/>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
