import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {} from './PopCoverMaker.constants';
import { IPopCoverMaker } from './PopCoverMaker.types';
import {
  ControllerContainer,
  PopCoverMakerContainer,
  PreviewImage,
  PreviewImageContainer,
} from './PopCoverMaker.styles';


const PopCoverMaker = (props: IPopCoverMaker): React.ReactElement => {
  const [actualImageZoom, setActualImageZoom] = useState<number>(1);
  const [imageZoom, setImageZoom] = useState<number>(1);
  const [borderColor, setBorderColor] = useState<string>('#EA37A7');
  const [delta, setDelta] = useState<{ dx: number, dy: number }>({ dx: 0, dy: 0 });
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
    setDelta({ dx, dy });
    redraw(dx, dy, actualWidth, actualHeight);
  }

  const setCenter = ()=> {
    const actualWidth = img.width / actualImageZoom * imageZoom;
    const actualHeight = img.height / actualImageZoom * imageZoom;
    const dx = (512 - actualWidth) / 2;
    const dy = (512 - actualHeight) / 2;
    setDelta({ dx, dy });
  }

  useEffect(() => {
    redraw();
  }, [ctx]);

  useEffect(() => {
    if (!imageFile) return;
    img.src = URL.createObjectURL(imageFile);
  }, [imageFile]);

  useEffect(() => {
    if (!imageFile || !img.width || !img.height || !imageZoom) return;
    const actualWidth = img.width / actualImageZoom;
    const actualHeight = img.height / actualImageZoom;

    redraw(delta.dx, delta.dy, actualWidth, actualHeight, imageZoom);
  }, [img, img.width,  img.height,  delta,  delta.dx, delta.dy, imageZoom]);

  return (
    <PopCoverMakerContainer>
      <canvas ref={canvasRef} width={512} height={512}/>
      <ControllerContainer>
        <label><span>강조컬러</span><input type='text' value={borderColor} onChange={(e)=>setBorderColor(e.target.value)}/></label>
        <label><span className={'btn'}>이미지 선택</span><input type='file' onChange={e => setImageFile(e.target.files[0] || undefined)}/></label>
        <button onClick={setCenter}>가운데 맞춤</button>
        <div>
          <button onClick={()=> setDelta(prevState => ({...prevState, dx: prevState.dx - 10}))}>◀</button>
          <button onClick={()=> setDelta(prevState => ({...prevState, dy: prevState.dy - 10}))}>▲</button>
          <button onClick={()=> setDelta(prevState => ({...prevState, dy: prevState.dy + 10}))}>▼</button>
          <button onClick={()=> setDelta(prevState => ({...prevState, dx: prevState.dx + 10}))}>►</button>
        </div>
        <label><span>zoom</span><input type='number' value={imageZoom} step={0.1} min={1} onChange={(e)=>setImageZoom(Number(e.target.value))}/></label>
      </ControllerContainer>
      {previewImage !== '' && imageFile ? <PreviewImageContainer>
        <a href={previewImage} download={'pop_' + imageFile?.name}><PreviewImage>
          <img src={previewImage}/>
        </PreviewImage><button>다운로드</button></a>
      </PreviewImageContainer> : <></>}
    </PopCoverMakerContainer>
  );
};

export default PopCoverMaker;
