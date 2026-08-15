import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import ProdutoCard from './ProdutoCard.jsx';

function useDragScroll(enabled) {
    const ref = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const elemento = ref.current;
        if (!elemento || !enabled) return;

        let arrastando = false;
        let startX = 0;
        let scrollLeft = 0;

        function onMouseMove(e) {
            if (!arrastando) return;
            e.preventDefault();
            const x = e.pageX - elemento.offsetLeft;
            const walk = (x - startX) * 1.5;
            elemento.scrollLeft = scrollLeft - walk;
        }

        function stopDragging() {
            arrastando = false;
            setIsDragging(false);
            window.removeEventListener('mousemove', onMouseMove);
        }

        function onMouseDown(e) {
            arrastando = true;
            setIsDragging(true);
            startX = e.pageX - elemento.offsetLeft;
            scrollLeft = elemento.scrollLeft;
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', stopDragging, {once: true});
        }

        elemento.addEventListener('mousedown', onMouseDown);

        return () => {
            elemento.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', stopDragging);
            setIsDragging(false);
        };
    }, [enabled]);

    return {ref, isDragging};
}

const MOBILE_BREAKPOINT = 768;

const ProdutosRow = ({titulo, produtos}) => {
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

    const {ref, isDragging} = useDragScroll(!isMobile);

    return (
        <section className='py-10' aria-label={titulo}>
            <div className='px-6 flex items-center justify-between mb-4'>
                <h2 className='text-2xl font-bold text-yellow-500'>{titulo}</h2>

                <Link
                    to='/produtos/todos'
                    className='bg-yellow-400 text-blue-900 font-bold text-sm py-2 px-5 rounded-xl shadow hover:bg-yellow-300 transition-transform hover:scale-105'
                >
                    Ver todos →
                </Link>
            </div>

            <div
                ref={ref}
                className={`
          overflow-x-auto pb-4 px-6
          snap-x snap-proximity scroll-smooth
          touch-pan-x select-none
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          ${!isMobile && !isDragging ? 'cursor-grab' : ''}
          ${!isMobile && isDragging ? 'cursor-grabbing' : ''}
        `}
            >
                <ul className='flex gap-4'>
                    {produtos.map((produto) => (
                        <li key={produto.id} className='shrink-0 w-65 snap-center'>
                            <ProdutoCard produto={produto}/>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ProdutosRow;
