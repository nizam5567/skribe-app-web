import React, { RefObject, useEffect, useRef } from 'react';

interface IOutsideAlerter {
  children: React.ReactNode
  handleClose: Function
}

function useOutsideAlerter (ref: RefObject<HTMLInputElement>, handleClose: Function) {
  useEffect(() => {
    const handleClickOutside = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose(true);
      } else {
        handleClose(false);
      }
    };
    document.addEventListener('mousedown', (e: any) => handleClickOutside(e));
    return () => {
      document.removeEventListener('mousedown', (e: any) => handleClickOutside(e));
    };
  }, [ref]);
}

const OutsideAlerter = ({ children, handleClose }: IOutsideAlerter) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleClose);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideAlerter;
