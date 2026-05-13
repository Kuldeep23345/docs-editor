'use client';
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/margins';
import { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { useStorage,useMutation } from '@liveblocks/react';

const markers = Array.from({ length: 83 }, (_, i) => i);
const Ruler = () => {
    const leftMargin = useStorage((storage)=>storage.leftMargin) ?? LEFT_MARGIN_DEFAULT;
    const rightMargin = useStorage((storage)=>storage.rightMargin) ?? RIGHT_MARGIN_DEFAULT;
    const setLeftMargin = useMutation(({storage},position:number)=>{
      storage.set('leftMargin',position)
    },[])
    const setRightMargin = useMutation(({storage},position:number)=>{
      storage.set('rightMargin',position)
    },[])
  // const [leftMargin, setLeftMargin] = useState(56);
  // const [rightMargin, setRightMargin] = useState(56);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };
  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const PAGE_WIDTH = 816;
    const MIN_SPACE = 100;
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector('#ruler-container');
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMargin - MIN_SPACE;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - (leftMargin + MIN_SPACE);
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
          const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition);
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };
  const handleLeftDoubleclick = () => {
    setLeftMargin(LEFT_MARGIN_DEFAULT);
  };
  const handleRightDoubleclick = () => {
    setRightMargin(RIGHT_MARGIN_DEFAULT);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-204 mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
    >
      <div id="ruler-container" className=" w-full h-full relative">
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleclick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleclick}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-204">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;
              return (
                <div key={marker} className="absolute bottom-0 " style={{ left: `${position}px` }}>
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-px h-2 bg-neutral-600" />
                      <span className="absolute bottom-0 text-[10px] text-neutral-500 transform -translate-1">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-px h-1.5 bg-neutral-500" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-px h-1 bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ruler;

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}
const Marker = ({ position, isLeft, isDragging, onMouseDown, onDoubleClick }: MarkerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-5 group -ml-2"
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
      <div
        className="absolute  left-1/2 top-4 transform -translate-1/2"
        style={{
          height: '200vh',
          width: '1px',
          transform: 'scaleX(0.5)',
          backgroundColor: '#3b72f6',
          display: isDragging ? 'block' : 'none',
        }}
      />
    </div>
  );
};
