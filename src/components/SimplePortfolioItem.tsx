import React from 'react';
import { Text, Box, Sphere } from '@react-three/drei';
import { useXR } from './SimplifiedXR';

interface ProjectItemProps {
    project: SimpleVR.ProjectData;
    time: number;
}

const SimplePortfolioItem: React.FC<ProjectItemProps> = ({
                                                             project,
                                                             time
                                                         }) => {
    const { isPresenting } = useXR();

    // Animation simple de flottement
    const hoverY = Math.sin(time + project.id) * 0.05;
    const rotationY = time * 0.2 + project.id;

    // Si en mode AR, ajuster la taille et la position pour une meilleure visualisation
    const scale = isPresenting ? 0.5 : 1; // Plus petit en AR

    return (
        <group
            position={[project.position[0], project.position[1] + hoverY, project.position[2]]}
            rotation={[0, rotationY, 0]}
            scale={scale}
        >
            {project.shape === 'box' ? (
                <Box args={[0.4, 0.4, 0.4]}>
                    <meshStandardMaterial
                        color={project.color}
                        emissive={project.color}
                        emissiveIntensity={0.3}
                    />
                </Box>
            ) : (
                <Sphere args={[0.25, 32, 32]}>
                    <meshStandardMaterial
                        color={project.color}
                        emissive={project.color}
                        emissiveIntensity={0.3}
                    />
                </Sphere>
            )}

            <Text
                position={[0, 0.3, 0]}
                rotation={[0, -rotationY, 0]} // Contre-rotation pour toujours faire face à l'utilisateur
                color="white"
                fontSize={0.08}
                maxWidth={0.8}
                lineHeight={1}
                textAlign="center"
            >
                {project.title}
            </Text>

            <Text
                position={[0, -0.3, 0]}
                rotation={[0, -rotationY, 0]} // Contre-rotation
                color="white"
                fontSize={0.05}
                maxWidth={1}
                lineHeight={1.2}
                textAlign="center"
            >
                {project.description}
            </Text>
        </group>
    );
};

export default SimplePortfolioItem;