import { useState } from 'react';
import SimplePortfolio3D from './SimplePortfolio3D';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

/**
 * Composant pour tester l'expérience sans utiliser WebXR
 * Utile pour le développement et les tests sur desktop
 */
const TestMode = () => {
    const [showHelp, setShowHelp] = useState(true);

    return (
        <div className="h-screen w-full relative">
            {showHelp && (
                <div className="absolute left-4 top-4 bg-black bg-opacity-70 text-white p-4 rounded-lg z-10 max-w-xs">
                    <h3 className="text-lg font-bold mb-2">Mode Test</h3>
                    <p className="mb-2">Ce mode vous permet de visualiser le portfolio sans WebXR.</p>
                    <ul className="list-disc list-inside mb-2 text-sm">
                        <li>Clic gauche + déplacement : Rotation</li>
                        <li>Clic droit + déplacement : Déplacement</li>
                        <li>Molette : Zoom</li>
                    </ul>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
                        onClick={() => setShowHelp(false)}
                    >
                        Fermer
                    </button>
                </div>
            )}

            <Canvas camera={{ position: [0, 1.6, 3] }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[0, 10, 5]} intensity={1.2} />

                {/* Contrôles pour naviguer dans la scène 3D */}
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

                {/* Notre portfolio 3D simplifié */}
                <SimplePortfolio3D />

                {/* Grille de référence pour aider à la navigation */}
                <gridHelper args={[10, 10, 0x444444, 0x222222]} />
            </Canvas>
        </div>
    );
};

export default TestMode;