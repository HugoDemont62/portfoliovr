/**
 * Utilitaires pour le support WebXR et la réalité augmentée
 */

/**
 * Vérifie si l'appareil et le navigateur prennent en charge WebXR (mode AR)
 * @returns Promise<boolean> - True si AR est supporté, false sinon
 */
export const checkXRSupport = async (): Promise<boolean> => {
    try {
        if ('xr' in navigator) {
            // Utilisation de any pour éviter les conflits de types
            const nav = navigator as any;

            if (nav.xr && typeof nav.xr.isSessionSupported === 'function') {
                // Vérifier le support AR
                return await nav.xr.isSessionSupported('immersive-ar');
            }
        }
        return false;
    } catch (error) {
        console.error("Erreur lors de la vérification de la prise en charge WebXR:", error);
        return false;
    }
};

/**
 * Options de session WebXR pour AR
 */
export const getARSessionInit = (domOverlayElement?: HTMLElement): XRSessionInit => {
    const sessionInit: XRSessionInit = {
        requiredFeatures: ['hit-test', 'anchors'],
        optionalFeatures: []
    };

    // Ajouter l'overlay DOM si disponible (améliore l'expérience utilisateur)
    if (domOverlayElement) {
        sessionInit.optionalFeatures?.push('dom-overlay');
        sessionInit.domOverlay = { root: domOverlayElement };
    }

    return sessionInit;
};

/**
 * Calculer la taille appropriée d'un objet en fonction de la distance
 * Utile pour que les objets gardent une taille visuelle cohérente en AR
 */
export const calculateScaleFromDistance = (distance: number, baseSize: number = 1): number => {
    // Plus l'objet est loin, plus il sera grand pour rester visible
    // Formule simple avec une relation linéaire
    return baseSize * (1 + distance * 0.5);
};

/**
 * Types WebXR pour TypeScript
 */
interface XRSessionInit {
    requiredFeatures?: string[];
    optionalFeatures?: string[];
    domOverlay?: {
        root: HTMLElement;
    };
}