import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProdutoCard from './ProdutoCard.jsx';

function useDragScroll(enabled) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseDown = useCallback(
    (e) => {
      if (!enabled) return;
      setIsDragging(true);
      startX.current = e.pageX - ref.current.offsetLeft;
      scrollLeft.current = ref.current.scrollLeft;
      window.addEventListener('mouseup', stopDragging, { once: true });
    },
    [enabled, stopDragging]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!enabled || !isDragging) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      ref.current.scrollLeft = scrollLeft.current - walk;
    },
    [enabled, isDragging]
  );

  return { ref, isDragging, onMouseDown, onMouseMove };
}

const MOBILE_BREAKPOINT = 768;

const ProdutosRow = ({ titulo, produtos }) => {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    let timeoutId;

    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }, 300);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { ref, isDragging, onMouseDown, onMouseMove } =
    useDragScroll(!isMobile);

  return (
    <section className='py-10'>
      <div className='px-6 flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold text-yellow-500'>{titulo}</h2>

        <Link
          to='/produtos'
          className='bg-yellow-400 text-blue-900 font-bold text-sm py-2 px-5 rounded-xl shadow hover:bg-yellow-300 transition-transform hover:scale-105'
        >
          Ver todos →
        </Link>
      </div>

      <ul
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        className={`
          flex overflow-x-auto gap-4 pb-4 px-6
          snap-x snap-proximity scroll-smooth
          touch-pan-x select-none
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          ${!isMobile && !isDragging ? 'cursor-grab' : ''}
          ${!isMobile && isDragging ? 'cursor-grabbing' : ''}
        `}
      >
        {produtos.map((produto) => (
          <li key={produto.id} className='shrink-0 w-[260px] snap-center'>
            <ProdutoCard produto={produto} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProdutosRow;
