import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ResizableTh.css';

const ResizableTh = ({ children, width, onResize, minWidth = 50, maxWidth = 600 }) => {
  const [colWidth, setColWidth] = useState(width);
  const [isResizing, setIsResizing] = useState(false);
  const thRef = useRef(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = thRef.current ? thRef.current.offsetWidth : colWidth;
  }, [colWidth]);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing) return;

    const diff = e.clientX - startXRef.current;
    const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidthRef.current + diff));
    setColWidth(newWidth);

    if (onResize) {
      onResize(newWidth);
    }
  }, [isResizing, minWidth, maxWidth, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (width !== undefined) {
      setColWidth(width);
    }
  }, [width]);

  return (
    <th
      ref={thRef}
      className={`resizable-th ${isResizing ? 'is-resizing' : ''}`}
      style={{ minWidth: `${minWidth}px`, width: `${colWidth}px` }}
    >
      <div className="resizable-th-content">
        <span className="resizable-th-text">{children}</span>
      </div>
      <div
        className="resizable-th-handle"
        onMouseDown={handleMouseDown}
        role="separator"
        aria-orientation="vertical"
      />
    </th>
  );
};

ResizableTh.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onResize: PropTypes.func,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
};

export default ResizableTh;
