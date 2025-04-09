import React, { useState, useRef } from 'react';
import { Text, Box, Sphere } from '@react-three/drei';
import { useXR } from './SimplifiedXR';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProjectItemProps {
    project: SimpleVR.ProjectData;
    time: number;
}

const SimplePortfolioItem: React.FC<ProjectItemProps> = ({
                                                             project,
                                                             time
                                                         }) => {
    const { isPresenting } = useXR();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const itemRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);

    // Animation simple de flottement
    const hoverY = Math.sin(time + project.id) * 0.05;
    const rotationY = time * 0.2 + project.id;

    // Mettre à jour l'état visuel du matériau directement dans useFrame
    useFrame(() => {
        if (itemRef.current) {
            // Animation de scale basée sur l'état
            const targetScale = clicked ? 1.4 : hovered ? 1.2 : 1;

            // Effet de pulsation en AR
            const pulse = isPresenting ? Math.sin(time * 2 + project.id) * 0.05 + 1 : 1;

            // Scale final (combiner l'état et la pulsation AR)
            const finalScale = targetScale * pulse * (isPresenting ? 0.5 : 1);

            // Animation d'échelle avec lissage/easing
            const currentScale = itemRef.current.scale.x;
            const newScale = currentScale + (finalScale - currentScale) * 0.1;
            itemRef.current.scale.set(newScale, newScale, newScale);

            // Animation de rotation en mode non-AR
            if (!isPresenting) {
                itemRef.current.rotation.y = rotationY;
            }
        }

        // Mettre à jour le matériau
        if (materialRef.current) {
            // Animation de l'intensité émissive
            materialRef.current.emissiveIntensity =
                materialRef.current.emissiveIntensity +
                ((hovered ? 0.5 : 0.3) - materialRef.current.emissiveIntensity) * 0.1;

            // On ne peut pas facilement animer la couleur sans react-spring
            // donc on la change directement
            if (hovered) {
                materialRef.current.color.set('#ffffff');
            } else {
                materialRef.current.color.set(project.color);
            }
        }
    });

    // Si en mode AR, ajuster la position pour améliorer l'affichage
    const posY = isPresenting ? project.position[1] : project.position[1] + hoverY;

    const content = (
        <group
            ref={itemRef}
            position={[project.position[0], posY, project.position[2]]}
            scale={[1, 1, 1]} // Scale initial, sera modifié par useFrame
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setClicked(!clicked)}
        >
            {project.shape === 'box' ? (
                <Box args={[0.4, 0.4, 0.4]}>
                    <meshStandardMaterial
                        ref={materialRef}
                        color={project.color}
                        emissive={project.color}
                        emissiveIntensity={0.3}
                        metalness={0.2}
                        roughness={0.3}
                    />
                </Box>
            ) : (
                <Sphere args={[0.25, 32, 32]}>
                    <meshStandardMaterial
                        ref={materialRef}
                        color={project.color}
                        emissive={project.color}
                        emissiveIntensity={0.3}
                        metalness={0.2}
                        roughness={0.3}
                    />
                </Sphere>
            )}

            <Text
                position={[0, 0.3, 0]}
                rotation={[0, isPresenting ? 0 : -rotationY, 0]} // Contre-rotation pour toujours faire face à l'utilisateur
                color="white"
                fontSize={0.08}
                maxWidth={0.8}
                lineHeight={1}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
            >
                {project.title}
            </Text>

            {(clicked || isPresenting) && (
                <Text
                    position={[0, -0.3, 0]}
                    rotation={[0, isPresenting ? 0 : -rotationY, 0]} // Contre-rotation
                    color="white"
                    fontSize={0.05}
                    maxWidth={1}
                    lineHeight={1.2}
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle"
                >
                    {project.description}
                </Text>
            )}
        </group>
    );

    return content;
};

export default SimplePortfolioItem;