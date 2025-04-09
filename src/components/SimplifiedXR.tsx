import React, { createContext, useState, useContext, useEffect } from 'react';
import { XR } from '@react-three/xr';

// Contexte XR simplifié
interface XRContextValue {
    isPresenting: boolean;
    hasAR: boolean;
    enterAR: () => void;
    exitAR: () => void;
}

const XRContext = createContext<XRContextValue>({
    isPresenting: false,
    hasAR: false,
    enterAR: () => {},
    exitAR: () => {},
});

// Hook personnalisé pour utiliser le contexte XR
export const useXR = () => useContext(XRContext);

// Propriétés pour le composant SimplifiedARButton
interface SimplifiedARButtonProps {
    className?: string;
    onStart?: () => void;
    children: React.ReactNode;
}

// Propriétés pour le composant SimplifiedXR
interface SimplifiedXRProps {
    children: React.ReactNode;
}

// Bouton simplifié pour activer la réalité augmentée
export const SimplifiedARButton: React.FC<SimplifiedARButtonProps> = ({
                                                                          className,
                                                                          children,
                                                                          onStart
                                                                      }) => {
    const { enterAR, hasAR } = useXR();

    const handleClick = () => {
        enterAR();
        if (onStart) onStart();
    };

    return (
        <button
            className={className}
            onClick={handleClick}
            disabled={!hasAR}
        >
            {children}
            {!hasAR && <span className="block text-sm mt-2 text-yellow-500">WebXR non disponible sur cet appareil</span>}
        </button>
    );
};

// Composant pour activer la réalité augmentée
export const SimplifiedXR: React.FC<SimplifiedXRProps> = ({ children }) => {
    const [isPresenting, setIsPresenting] = useState(false);
    const [hasAR, setHasAR] = useState(false);

    // Vérifier la disponibilité de WebXR AR au chargement
    useEffect(() => {
        const checkARSupport = async () => {
            const nav = navigator as Navigator & { xr?: { isSessionSupported: (mode: string) => Promise<boolean> } };
            if (nav.xr) {
                try {
                    const isSupported = await nav.xr.isSessionSupported('immersive-ar');
                    setHasAR(isSupported);
                    console.log("Support AR détecté:", isSupported);
                } catch (error) {
                    console.error("Erreur lors de la vérification AR:", error);
                    setHasAR(false);
                }
            } else {
                console.log("WebXR n'est pas disponible sur ce navigateur");
                setHasAR(false);
            }
        };

        checkARSupport();
    }, []);

    // Entrer en mode AR
    const enterAR = () => {
        console.log("Tentative d'entrée en mode AR");
        setIsPresenting(true);
    };

    // Sortir du mode AR
    const exitAR = () => {
        console.log("Sortie du mode AR");
        setIsPresenting(false);
    };

    // Nettoyer à la sortie
    useEffect(() => {
        return () => {
            if (isPresenting) exitAR();
        };
    }, [isPresenting]);

    // Fournir le contexte XR avec les vraies fonctionnalités AR
    return (
        <XRContext.Provider value={{ isPresenting, hasAR, enterAR, exitAR }}>
            <XR
                onSessionStart={() => setIsPresenting(true)}
                onSessionEnd={() => setIsPresenting(false)}
            >
                {children}
            </XR>
        </XRContext.Provider>
    );
};

// Ajout des propriétés manquantes au type XRProperties
declare module '@react-three/xr' {
    interface XRProperties {
        onSessionStart?: () => void;
        onSessionEnd?: () => void;
    }
}