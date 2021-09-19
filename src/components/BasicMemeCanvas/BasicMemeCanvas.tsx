import React, { useEffect, useRef, useState } from "react";

interface Props {
  imageUrl: string;
  text: string;
  textLoc?: {
    x: number;
    y: number;
  };
  fontOptions?: {
    fontFamily?: string;
    fontSize?: number;
    fontColor?: string;
    fontWeight?: string;
    lineHeight?: number;
  };
  width?: number;
  height?: number;
}

const defaultFont = {
  family: "sans-serif",
  size: 16,
  color: "#000000",
  weight: "normal",
  lineHeight: 1,
};

const BasicMemeCanvas = ({
  imageUrl,
  text,
  width,
  height,
  fontOptions,
  textLoc,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentWidth, setCurrentWidth] = useState(width ?? 0);
  const [currentHeight, setCurrentHeight] = useState(height ?? 0);

  const resizeCanvasWithLoadedImage = (
    imageWidth: number,
    imageHeight: number
  ) => {
    if (!width) {
      setCurrentWidth(imageWidth);
    }

    if (!height) {
      const imgRatio = imageHeight / imageWidth;

      setCurrentHeight(width ? currentWidth * imgRatio : imageHeight);
    }
  };

  const updateText = () => {
    if (!canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext("2d");
    const fontWeight = fontOptions?.fontWeight ?? defaultFont.weight;
    const fontSize = fontOptions?.fontSize ?? defaultFont.size;
    const fontColor = fontOptions?.fontColor ?? defaultFont.color;
    const fontFamily = fontOptions?.fontFamily ?? defaultFont.family;
    const lineHeight = fontOptions?.lineHeight ?? defaultFont.lineHeight;
    const textBeginLoc = textLoc ?? { x: 0, y: 0 };
    const lines = text.split("\n");

    if (!context) {
      return;
    }

    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    context.fillStyle = fontColor;

    lines.forEach((line, index) => {
      context.fillText(
        line,
        textBeginLoc.x,
        textBeginLoc.y + fontSize * (index ? lineHeight : 1) * (index + 1)
      );
    });
  };

  const updateImage = () => {
    if (!canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext("2d");
    const image = document.createElement("img");

    image.src = imageUrl;

    image.onload = () => {
      resizeCanvasWithLoadedImage(image.width, image.height);
      context?.drawImage(image, 0, 0);
      updateText();
    };
  };

  useEffect(() => {
    updateImage();
  }, [imageUrl, width, height, textLoc]);

  useEffect(() => {
    updateText();
  }, [text]);

  return <canvas ref={canvasRef} width={currentWidth} height={currentHeight} />;
};

export default BasicMemeCanvas;
