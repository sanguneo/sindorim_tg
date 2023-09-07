import React, { useEffect, useMemo, useRef, useState } from 'react';
import {} from './PopCoverMaker.constants';
import { IPopCoverMaker } from './PopCoverMaker.types';
import {
  ControllerContainer,
  PopCoverMakerContainer,
  PreviewImage,
  PreviewImageContainer,
} from './PopCoverMaker.styles';

import detectTouchEvents from 'detect-touch-events';


const PopCoverMaker = (props: IPopCoverMaker): React.ReactElement => {
  const [actualImageZoom, setActualImageZoom] = useState<number>(1);
  const [imageZoom, setImageZoom] = useState<number>(1);
  const [borderColor, setBorderColor] = useState<string>('#EA37A7');
  const [delta, setDelta] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [mouseDelta, setMouseDelta] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [imageFile, setImageFile] = useState<File>();

  const [previewImage, setPreviewImage] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>();

  const ctx: CanvasRenderingContext2D = useMemo(()=> canvasRef?.current?.getContext('2d'), [canvasRef?.current]);

  const img = useMemo(()=> new Image(), []);

  const redraw = (dx=0, dy=0, width=512, height=512, zoom=1) => {
    if (!ctx) return;
    ctx.clearRect(0,0, 512, 512);
    ctx.drawImage(img, dx, dy, width*zoom, height*zoom);
    ctx.lineWidth = 48;
    ctx.strokeStyle = borderColor + 'CC';
    ctx.beginPath();
    // @ts-ignore
    ctx.roundRect(0, 0, 512, 512, 48);
    ctx.stroke();
    setPreviewImage(ctx.canvas.toDataURL('image/jpeg', 1));
  }

  img.onload = function() {
    const zoomRatio = Math.min(img.width / 512, img.height / 512);
    setActualImageZoom(zoomRatio);
    setImageZoom(1);
    const actualWidth = img.width / zoomRatio;
    const actualHeight = img.height / zoomRatio;
    const dx = (512 - actualWidth) / 2;
    const dy = (512 - actualHeight) / 2;
    setDelta({ x: dx, y: dy });
    redraw(dx, dy, actualWidth, actualHeight);
  }

  const setCenter = ()=> {
    const actualWidth = img.width / actualImageZoom * imageZoom;
    const actualHeight = img.height / actualImageZoom * imageZoom;
    const dx = (512 - actualWidth) / 2;
    const dy = (512 - actualHeight) / 2;
    setDelta({ x: dx, y: dy });
    setMouseDelta({ x: 0, y: 0 });
  }

  const translatePos = (e : MouseEvent | TouchEvent) => {
    if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
      const te = e as TouchEvent;
      const touch = te.touches[0] || te.changedTouches[0];
      return {
        x: touch.pageX,
        y: touch.pageY,
      }
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
      const me = e as MouseEvent;
      return {
        x: me.clientX,
        y: me.clientY
      }
    }
  }

  useEffect(() => {
    if (!canvasRef?.current) return;

    const canvas = canvasRef?.current;
    let moving = false;
    let firstpos = {x: 0, y: 0};
    let lastDelta = {x: 0, y: 0};

    const onMousedown = (e: MouseEvent | TouchEvent) => requestAnimationFrame(()=>{
      moving = true;
      const {x, y} = translatePos(e);
      firstpos.x = x;
      firstpos.y = y;
      setMouseDelta((prev) => {
        lastDelta.x = prev.x;
        lastDelta.y = prev.y;
        return prev;
      });
    });

    const onMousemove = (e: MouseEvent | TouchEvent) => requestAnimationFrame(()=>{
      if (!moving) return;
      const {x, y} = translatePos(e);
      setMouseDelta(() => ({
        x: lastDelta.x + (x - firstpos.x),
        y: lastDelta.y + (y - firstpos.y),
      }));
    });

    const onMouseup = (e: MouseEvent | TouchEvent) => requestAnimationFrame(()=>{
      moving = false;
    });
    if (!detectTouchEvents.hasSupport) {
      canvas.addEventListener('mousedown', onMousedown);
      canvas.addEventListener('mousemove', onMousemove);
      canvas.addEventListener('mouseup', onMouseup);
      canvas.addEventListener('mouseleave', onMouseup);
    } else {
      canvas.addEventListener('touchstart', onMousedown);
      canvas.addEventListener('touchmove', onMousemove);
      canvas.addEventListener('touchend', onMouseup);
      canvas.addEventListener('touchcancel', onMouseup);
    }


    return () => {
      if (!detectTouchEvents.hasSupport) {
        canvas.removeEventListener('mousedown', onMousedown);
        canvas.removeEventListener('mousemove', onMousemove);
        canvas.removeEventListener('mouseup', onMouseup);
        canvas.removeEventListener('mouseleave', onMouseup);
      } else {
        canvas.removeEventListener('touchstart', onMousedown);
        canvas.removeEventListener('touchmove', onMousemove);
        canvas.removeEventListener('touchend', onMouseup);
        canvas.removeEventListener('touchcancel', onMouseup);
      }
    }


  }, [canvasRef?.current]);

  useEffect(() => {
    if (!imageFile) return;
    img.src = URL.createObjectURL(imageFile);
  }, [imageFile]);

  useEffect(() => {
    if (!imageFile || !img.width || !img.height || !imageZoom) return;
    const actualWidth = img.width / actualImageZoom;
    const actualHeight = img.height / actualImageZoom;

    redraw(delta.x + mouseDelta.x, delta.y + mouseDelta.y, actualWidth, actualHeight, imageZoom);
  }, [img, img.width,  img.height,  delta,  delta.x, delta.y, mouseDelta,  mouseDelta.x, mouseDelta.y, imageZoom]);

  return (
    <PopCoverMakerContainer>
      <canvas ref={canvasRef} width={512} height={512}/>
      <ControllerContainer>
        <label><span>강조컬러</span><input type='text' value={borderColor} onChange={(e)=>setBorderColor(e.target.value)}/></label>
        <label><span className={'btn'}>이미지 선택</span><input type='file' onChange={e => setImageFile(e.target.files[0] || undefined)}/></label>
        <button onClick={setCenter}>가운데 맞춤</button>
        <span>
          <button onClick={()=>setImageZoom((prev)=> prev+0.1)}>확대</button>
          <button onClick={()=>setImageZoom((prev)=> prev-0.1)}>축소</button>
        </span>
      </ControllerContainer>
      {previewImage !== '' && imageFile ? <PreviewImageContainer>
        미리보기<br />(인기스타일은 같이 안나옴)
        <a href={previewImage} download={'pop_' + imageFile?.name}><PreviewImage>
          <img src={previewImage}/>
        </PreviewImage><button>다운로드</button></a>
      </PreviewImageContainer> : <></>}
    </PopCoverMakerContainer>
  );
};

export default PopCoverMaker;
