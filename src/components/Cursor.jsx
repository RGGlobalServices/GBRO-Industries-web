import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef   = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor   = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top  = `${mouseY}px`;
    };

    const updateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = `${followerX}px`;
      follower.style.top  = `${followerY}px`;
      rafId = requestAnimationFrame(updateFollower);
    };

    const onEnter = () => {
      cursor.classList.add('cursor--hover');
      follower.classList.add('cursor-follower--hover');
    };
    const onLeave = () => {
      cursor.classList.remove('cursor--hover');
      follower.classList.remove('cursor-follower--hover');
    };

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(updateFollower);

    // Delegate hover to interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll('a, button, .service-card, .portfolio-card, .why-card, .filter-btn').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    addHoverListeners();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
}
