'use client';

import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import Card from './card/index';

export default function ParallaxContainer({ personal } : any) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={container} style={{ height: `${personal.length * 100}vh` }}>
      {personal.map((number : any, index : any) => {
        const targetScale = 1 - ((personal.length - index) * 0.05);
        
        return (
          <Card
            key={index}
            index={index}
            number={number.number}
            text={number.text}
            color={number.color}
            targetScale={targetScale}
            progress={scrollYProgress}
            range={[index * .25, 1]}
          />
        );
      })}
    </div>
  );
}