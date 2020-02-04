import React from 'react';
import getNearestScrollableDom from './getNearestScrollableDom';

interface SmoothScrollProps {
  children?: React.ReactElement;
}

const SmoothScroll: React.ComponentType<SmoothScrollProps> = ({
  children = null,
}) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const scrollableDom = getNearestScrollableDom(ref.current);
    if (scrollableDom != null) {
      scrollableDom.style.scrollBehavior = 'smooth';
    }
  }, []);

  return <span ref={ref}>{children}</span>;
};

export default SmoothScroll;
