'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { templates } from '@/constants/templates';
import { cn } from '@/lib/utils';
import { api } from '../../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const TemplateGallery = () => {
  const router = useRouter();
  const create = useMutation(api.document.create);
  const [isCreating,setIsCreating] = useState(false);

  const onTemplate = (title:string,initialContent:string)=>{
    setIsCreating(true);
    create({title,initialContent})
    .then((documentId)=>{
      router.push(`/documents/${documentId}`)
    })
    .catch(()=>{
      toast.error("Failed to create document")
    })
    .finally(()=>{
      setIsCreating(false);
    })
  }
  return (
    <div className="bg-[#F1F3F4]">
      <div className="max-w-7xl mx-auto px-16 py-6 flex flex-col gap-y-4 ">
        <h3 className="font-medium">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/6 2xl:basis-1/8 pl-4"
              >
                <div
                  className={cn(
                    'aspect-3/4 flex flex-col gap-y-2.5',
                    isCreating && 'pointer-events-none opacity-50'
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() => onTemplate(template.label,"")}
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    className="size-full hover:border-blue-500 rounded-sm b border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  />

                  <p className="ml-1 text-sm font-medium truncate">{template.label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default TemplateGallery;
