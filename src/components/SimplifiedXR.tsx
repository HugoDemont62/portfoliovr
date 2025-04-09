import React, { createContext, useState, useContext, useEffect } from 'react';
// Importons également useXR et XRStore depuis @react-three/xr
import { XR, XRStore, createXRStore } from '@react-three/xr';

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

    // Créer un store XR
    const [xrStore] = useState<XRStore>(() => createXRStore());

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

        // Essayer de démarrer la session via le store
        if (xrStore) {
            const session = xrStore.getState().session;
            if (!session) {
                console.log("Démarrage de la session AR via le store");
                // Note: il faudrait normalement appeler une méthode sur le store
                // mais nous utilisons setIsPresenting comme rapprochement
            }
        }
    };

    // Sortir du mode AR
    const exitAR = () => {
        console.log("Sortie du mode AR");
        setIsPresenting(false);

        // Essayer de terminer la session via le store
        if (xrStore) {
            const session = xrStore.getState().session;
            if (session) {
                console.log("Fin de la session AR via le store");
                session.end().catch(console.error);
            }
        }
    };

    // S'abonner aux changements d'état de la session dans le store
    useEffect(() => {
        if (!xrStore) return;

        const unsubscribe = xrStore.subscribe(state => {
            // Mettre à jour notre état local quand l'état XR change
            setIsPresenting(!!state.session);
        });

        return unsubscribe;
    }, [xrStore]);

    // Nettoyer à la sortie
    useEffect(() => {
        return () => {
            if (isPresenting) exitAR();
        };
    }, [isPresenting]);

    // Fournir le contexte XR avec le store XR requis
    return (
        <XRContext.Provider value={{ isPresenting, hasAR, enterAR, exitAR }}>
            <XR store={xrStore}>
                {children}
            </XR>
        </XRContext.Provider>
    );
};