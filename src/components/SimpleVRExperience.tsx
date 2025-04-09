import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import SimplePortfolio3D from './SimplePortfolio3D';
import { SimplifiedXR, SimplifiedARButton } from './SimplifiedXR';

const SimpleVRExperience = () => {
    const [hasStarted, setHasStarted] = useState(false);

    return (
        <div className="h-screen w-full relative">
            {!hasStarted && (
                <div className="absolute inset-0 bg-black bg-opacity-80 z-10 flex flex-col items-center justify-center p-6">
                    <h1 className="text-3xl font-bold text-white mb-6 text-center">
                        Mon Portfolio en Réalité Augmentée
                    </h1>
                    <p className="text-white text-lg mb-6 text-center max-w-md">
                        Déplacez votre téléphone autour de vous pour explorer l'espace.
                        Les objets 3D apparaîtront dans votre environnement.
                    </p>
                    <p className="text-white text-lg mb-8 text-center max-w-md">
                        Vous devrez autoriser l'accès à votre caméra pour l'expérience.
                    </p>
                    <SimplifiedARButton
                        className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg"
                        onStart={() => setHasStarted(true)}
                    >
                        Commencer l'expérience
                    </SimplifiedARButton>
                </div>
            )}

            <Canvas>
                <SimplifiedXR>
                    <Environment preset="sunset" />
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[0, 10, 5]} intensity={1.2} />

                    {/* Portfolio 3D simplifié sans interactions complexes */}
                    <SimplePortfolio3D />
                </SimplifiedXR>
            </Canvas>
        </div>
    );
};

export default SimpleVRExperience;