import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import SimplePortfolio3D from './SimplePortfolio3D';
import { SimplifiedXR, SimplifiedARButton } from './SimplifiedXR';

// Composant pour afficher les conseils d'utilisation
const ARInstructions = () => {
    return (
        <div className="absolute bottom-10 left-0 right-0 bg-black bg-opacity-60 text-white p-4 mx-4 rounded-lg z-20 text-center">
            <p className="text-lg mb-2">Déplacez lentement votre téléphone pour détecter les surfaces.</p>
            <p className="text-sm">Tapez sur l'écran pour placer les objets dans votre environnement.</p>
        </div>
    );
};

const SimpleVRExperience = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);

    // Cacher les instructions après 10 secondes
    if (hasStarted && showInstructions) {
        setTimeout(() => setShowInstructions(false), 10000);
    }

    return (
        <div className="h-screen w-full relative">
            {!hasStarted && (
                <div className="absolute inset-0 bg-black bg-opacity-80 z-10 flex flex-col items-center justify-center p-6">
                    <h1 className="text-3xl font-bold text-white mb-6 text-center">
                        Mon Portfolio en Réalité Augmentée
                    </h1>
                    <p className="text-white text-lg mb-6 text-center max-w-md">
                        Visualisez mes projets directement dans votre environnement !
                        Pointez votre caméra vers une surface plane pour commencer.
                    </p>
                    <p className="text-white text-lg mb-8 text-center max-w-md">
                        Vous devrez autoriser l'accès à votre caméra pour l'expérience.
                    </p>

                    {/* Utiliser le composant SimplifiedARButton à la place de ARButton */}
                    <SimplifiedARButton
                        className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg"
                        onStart={() => setHasStarted(true)}
                    >
                        Commencer l'expérience AR
                    </SimplifiedARButton>
                </div>
            )}

            {hasStarted && showInstructions && <ARInstructions />}

            <Canvas
                camera={{
                    position: [0, 1.6, 3],
                    fov: 70,
                    near: 0.01,
                    far: 1000
                }}
                gl={{ alpha: true, antialias: true }}
            >
                <SimplifiedXR>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[1, 1, 1]} intensity={1} />
                    <pointLight position={[0, 5, 0]} intensity={0.5} />

                    {/* Environnement 3D pour l'éclairage réaliste */}
                    <Environment preset="sunset" />

                    {/* Portfolio avec placement AR */}
                    <SimplePortfolio3D />
                </SimplifiedXR>
            </Canvas>
        </div>
    );
};

export default SimpleVRExperience;