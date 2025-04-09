import React, { createContext, useState, useContext, useEffect } from 'react';
import { useThree } from '@react-three/fiber';

// Contexte XR simplifié
interface XRContextValue {
    isPresenting: boolean;
    enterAR: () => void;
    exitAR: () => void;
}

const XRContext = createContext<XRContextValue>({
    isPresenting: false,
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
    const { enterAR } = useXR();

    const handleClick = () => {
        enterAR();
        if (onStart) onStart();
    };

    return (
        <button
            className={className}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

// Composant pour activer la réalité augmentée
export const SimplifiedXR: React.FC<SimplifiedXRProps> = ({ children }) => {
    const [isPresenting, setIsPresenting] = useState(false);
    const { camera } = useThree();

    // Simuler l'entrée en mode AR
    const enterAR = () => {
        console.log("Entrée en mode AR simulée");
        setIsPresenting(true);

        // Modifications à la caméra pour simuler l'AR
        camera.position.set(0, 1.6, 0);
        // Ici, dans une vraie implémentation, nous initialiserions WebXR
    };

    // Simuler la sortie du mode AR
    const exitAR = () => {
        console.log("Sortie du mode AR simulée");
        setIsPresenting(false);

        // Remise à l'état initial
        camera.position.set(0, 1.6, 3);
    };

    // Nettoyer à la sortie
    useEffect(() => {
        return () => {
            if (isPresenting) exitAR();
        };
    }, [isPresenting]);

    // Fournir le contexte XR
    return (
        <XRContext.Provider value={{ isPresenting, enterAR, exitAR }}>
            {children}
        </XRContext.Provider>
    );
};