import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useState, useRef } from 'react';
import SimplePortfolioItem from './SimplePortfolioItem';
import { useXR } from './SimplifiedXR';

// Composant simplifié sans les fonctionnalités avancées d'AR qui posent problème
const SimplePortfolio3D = () => {
    // Compteur pour l'animation
    const [time, setTime] = useState(0);
    const { isPresenting } = useXR();

    // Référence du groupe principal pour le positionnement AR
    const groupRef = useRef(null);

    // Animation simple
    useFrame((state) => {
        setTime(state.clock.getElapsedTime());
    });

    // Liste des projets du portfolio
    const projects: SimpleVR.ProjectData[] = [
        {
            id: 1,
            title: "Projet Web",
            description: "Site web développé avec React et TypeScript",
            color: "#4285F4", // Bleu Google
            position: [0, 0.5, -1],
            shape: 'box'
        },
        {
            id: 2,
            title: "Application Mobile",
            description: "Application développée avec React Native",
            color: "#EA4335", // Rouge Google
            position: [-1, 0.5, 0],
            shape: 'sphere'
        },
        {
            id: 3,
            title: "Jeu Vidéo",
            description: "Jeu 3D développé avec Unity",
            color: "#FBBC05", // Jaune Google
            position: [1, 0.5, 0],
            shape: 'box'
        },
        {
            id: 4,
            title: "Intelligence Artificielle",
            description: "Projet d'IA utilisant TensorFlow",
            color: "#34A853", // Vert Google
            position: [0, 0.5, 1],
            shape: 'sphere'
        }
    ];

    // Mode AR vs mode test
    if (isPresenting) {
        // En mode AR, positionner les projets en cercle
        return (
            <group ref={groupRef} scale={[0.5, 0.5, 0.5]}>
                {/* Texte d'introduction */}
                <Text
                    position={[0, 1.5, 0]}
                    color="white"
                    fontSize={0.2}
                    maxWidth={2}
                    lineHeight={1.2}
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle"
                >
                    Mon Portfolio
                </Text>

                {/* Affichage des projets en cercle autour du centre */}
                {projects.map((project, index) => {
                    const angle = (index / projects.length) * Math.PI * 2;
                    const radius = 1.5;
                    const x = Math.sin(angle) * radius;
                    const z = Math.cos(angle) * radius;

                    return (
                        <SimplePortfolioItem
                            key={project.id}
                            project={{
                                ...project,
                                position: [x, 0.5, z]
                            }}
                            time={time}
                        />
                    );
                })}
            </group>
        );
    }

    // Mode non-AR (mode test sur desktop)
    return (
        <group>
            {/* Sol pour aider à l'orientation */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.1, 0]}
                receiveShadow
            >
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#e0e0e0" transparent opacity={0.5} />
            </mesh>

            {/* Texte d'introduction */}
            <Text
                position={[0, 1.5, -2]}
                color="white"
                fontSize={0.2}
                maxWidth={2}
                lineHeight={1.2}
                textAlign="center"
            >
                Mon Portfolio
            </Text>

            {/* Affichage des projets */}
            {projects.map((project) => (
                <SimplePortfolioItem
                    key={project.id}
                    project={project}
                    time={time}
                />
            ))}
        </group>
    );
};

export default SimplePortfolio3D;