import React from 'react';

interface ArrowProps {
  fill?: string;
  width?: string | number;
  height?: string | number;
  minSize?: number;
  maxSize?: number;
}

const Arrow = ({
  fill,
  width,
  height,
  minSize = 14,
  maxSize = 22,
}: ArrowProps) => {
  const responsiveSize = `clamp(${minSize}px, ${minSize}px + 0.5vw, ${maxSize}px)`;

  return (
    <svg
      width={width || responsiveSize}
      height={height || responsiveSize}
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.00013 11.4999L20.2017 11.4999"
        stroke={fill || 'var(--black)'}
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M11.3992 1.89922L21 11.5L11.3992 21.1008"
        stroke={fill || 'var(--black)'}
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow;
