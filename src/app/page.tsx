'use client'

import { FC, useState } from 'react';
import { useDraw } from './hooks/useDraw';
import { ChromePicker } from 'react-color';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {

  // set colors
  const [color, setColor] = useState<string>('#000000');
  const [eraserColor, setEraserColor] = useState<string>('#ffffff');

  // set width
  const [lineWidth, setLineWidth] = useState<number>(5);

  // condition to erase
  const [isEraser, setIsEraser] = useState<boolean>(false);
  
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = isEraser ? eraserColor : color;
    const lineWidthSize = lineWidth;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidthSize;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();

  }

  return (
  <div className='w-screen h-screen bg-gray-300 flex justify-center items-center'>
    <div className='flex flex-col gap-10 p-10 border-black border rounded-lg mr-10 bg-white'>
      <ChromePicker 
      color={color}
      onChange={(color) => setColor(color.hex)}
      className='border border-black rounded-md p-10'
      />
      <button type='button' className={`p-2 rounded-md border border-black hover:bg-gray-200 active:bg-gray-500 ${isEraser ? 'bg-orange' : ''}`} onClick={
        () => setIsEraser(!isEraser)}>
            {isEraser ? 'Drawing Mode' : 'Eraser Mode'}
      </button>
      <div className='flex items-center justify-center p-2 rounded-md border border-black'>
        <label className='pr-2' htmlFor='lineWidthInput'>
          Line Width:
        </label>
        <input
          id='lineWidthInput'
          type='number'
          value={lineWidth}
          min={1}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className='border rounded-md p-1'
        />
      </div>
      <button type='button' className='p-2 rounded-md border border-black hover:bg-gray-200 active:bg-gray-500 ' onClick={clear}>
        Clear
      </button>
    </div>
    
    <canvas 
    onMouseDown={onMouseDown}
    ref={canvasRef}
    width={950}
    height={750}
    className='border border-black rounded-lg bg-white'
    />
  </div>);
};

export default Page;
