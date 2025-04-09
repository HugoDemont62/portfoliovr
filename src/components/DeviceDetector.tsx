import { useState, useEffect } from 'react';
import DesktopView from './DesktopView';
import SimpleMobileView from './SimpleMobileView';

const DeviceDetector = () => {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        // Fonction pour détecter si l'appareil est mobile
        const checkIfMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const mobileDevices = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i;

            return mobileDevices.test(userAgent);
        };

        setIsMobile(checkIfMobile());

        // Ajouter un écouteur d'événement pour les changements de taille d'écran
        const handleResize = () => {
            setIsMobile(checkIfMobile());
        };

        window.addEventListener('resize', handleResize);

        // Nettoyer l'écouteur d'événement lors du démontage
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Afficher un loader pendant la détection
    if (isMobile === null) {
        return <div className="flex items-center justify-center h-screen">Chargement...</div>;
    }

    // Rediriger vers la vue appropriée en fonction du type d'appareil
    return isMobile ? <SimpleMobileView /> : <DesktopView />;
};

export default DeviceDetector;