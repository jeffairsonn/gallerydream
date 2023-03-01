import React from 'react';

const Container = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => (
  <div className={`px-4 md:px-8 gap-4 py-8 md:py-16 pb-24 ${className}`}>
    {children}
  </div>
);

Container.defaultProps = {
  className: {},
};

export default Container;
