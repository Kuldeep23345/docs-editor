import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from './navbar';

const page = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Suspense fallback={null}>
          <Navbar/>
        </Suspense>
      </div>
      <Button variant={'outline'}>Button</Button>
    </div>
  );
};

export default page;
