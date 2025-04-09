/**
 * Types globaux pour l'application
 * Note: Nous n'étendons PAS l'interface Navigator pour éviter les conflits avec les définitions existantes
 */

// Interfaces pour trois.js et react-three/fiber qui pourraient manquer
interface ThreeEvent {
    stopPropagation: () => void;
    target: {
        object: THREE.Object3D;
        distance: number;
    };
}

// Types supplémentaires pour les interactions VR simplifiées
declare namespace SimpleVR {
    interface ProjectData {
        id: number;
        title: string;
        description: string;
        color: string;
        position: [number, number, number];
        shape: 'box' | 'sphere';
    }
}