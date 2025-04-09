import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useState } from 'react';
import SimplePortfolioItem from './SimplePortfolioItem';
import { useXR } from './SimplifiedXR';

// Utiliser le type personnalisé de global.d.ts
const SimplePortfolio3D = () => {
    // Compteur pour l'animation
    const [time, setTime] = useState(0);
    const { isPresenting } = useXR();

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

    return (
        <group>
            {/* Sol pour aider à l'orientation */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.1, 0]}
                receiveShadow
            >
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#e0e0e0" transparent opacity={isPresenting ? 0.2 : 0.5} />
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
                {isPresenting ? "Regardez autour de vous!" : "Mon Portfolio"}
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