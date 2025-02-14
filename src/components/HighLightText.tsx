"use client";
import { HighlightTextProps } from "@/definitions";
import { FC, useEffect, useRef, useState } from "react";

const HighLightText: FC<HighlightTextProps> = ({ children }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (textRef.current) {
      const { width, height } = textRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [children]);

  return (
    <span className="relative inline-block">
      <svg
        className="absolute -top-[2px] -left-1 -z-10"
        width={dimensions.width + 10}
        height={dimensions.height + 6}
        viewBox={`0 0 ${dimensions.width + 10} ${dimensions.height + 6}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d={`
            M0 4
            C${dimensions.width * 0.2} 2, ${dimensions.width * 0.4} 5, ${
            dimensions.width * 0.6
          } 3
            S${dimensions.width * 0.8} 4, ${dimensions.width + 8} 2
            L${dimensions.width + 10} ${dimensions.height + 4}
            C${dimensions.width * 0.8} ${dimensions.height + 5}, ${
            dimensions.width * 0.6
          } ${dimensions.height + 3}, ${dimensions.width * 0.4} ${
            dimensions.height + 4
          }
            S${dimensions.width * 0.2} ${dimensions.height + 3}, 0 ${
            dimensions.height + 2
          }
            Z
          `}
          fill="#FFE8A3"
        />
      </svg>
      <span ref={textRef} className="relative z-10">
        {children}
      </span>
    </span>
  );
};

export default HighLightText;
