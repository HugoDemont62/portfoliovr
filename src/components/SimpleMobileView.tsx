import { useState, useEffect } from 'react';
import SimpleVRExperience from './SimpleVRExperience';
import NotSupportedView from './NotSupportedView';
import TestMode from './TestMode';
import { checkXRSupport } from '../utils/XRUtils';

const SimpleMobileView = () => {
    const [isXRSupported, setIsXRSupported] = useState<boolean | null>(null);
    const [useTestMode, setUseTestMode] = useState(false);

    useEffect(() => {
        // Vérifier la compatibilité WebXR
        const verifyXRSupport = async () => {
            const isSupported = await checkXRSupport();
            setIsXRSupported(isSupported);
        };

        verifyXRSupport();
    }, []);

    // Activer le mode test (pour le développement)
    const enableTestMode = () => {
        setUseTestMode(true);
    };

    // Afficher un chargement pendant la vérification
    if (isXRSupported === null) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <p className="mb-2">Vérification de la compatibilité de votre appareil...</p>
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        );
    }

    // Si le mode test est activé, afficher le mode test
    if (useTestMode) {
        return <TestMode />;
    }

    // Si l'appareil ne prend pas en charge WebXR, afficher un message avec option de test
    if (!isXRSupported) {
        return (
            <div>
                <NotSupportedView />
                <div className="fixed bottom-4 right-4">
                    <button
                        onClick={enableTestMode}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                    >
                        Mode Test
                    </button>
                </div>
            </div>
        );
    }

    // Afficher l'expérience VR simplifiée
    return <SimpleVRExperience />;
};

export default SimpleMobileView;