import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = ({ smooth = false }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top when pathname changes
        if (smooth) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, smooth]);

    return null; // This component doesn't render anything
};

export default ScrollToTop;
