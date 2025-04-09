/**
 * Vérifie si l'appareil et le navigateur prennent en charge WebXR
 * Cette fonction utilise any pour éviter les conflits de types avec les définitions TypeScript intégrées
 */
export const checkXRSupport = async (): Promise<boolean> => {
    try {
        if ('xr' in navigator) {
            // Utilisation de any pour éviter les conflits de types
            const nav = navigator as any;

            if (nav.xr && typeof nav.xr.isSessionSupported === 'function') {
                return await nav.xr.isSessionSupported('immersive-ar');
            }
        }
        return false;
    } catch (error) {
        console.error("Erreur lors de la vérification de la prise en charge WebXR:", error);
        return false;
    }
};