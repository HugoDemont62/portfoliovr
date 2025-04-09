
const NotSupportedView = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-md mx-auto text-center bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6">Appareil non compatible</h1>

                <div className="mb-6">
                    <p className="text-xl mb-4">Désolé, votre appareil ne prend pas en charge la réalité augmentée/virtuelle (WebXR).</p>
                    <p className="mb-4">Pour profiter de cette expérience, vous avez besoin d'un appareil mobile compatible avec WebXR comme :</p>

                    <ul className="list-disc list-inside text-left mb-4">
                        <li>iPhone récent (iPhone 8 ou plus récent avec iOS 13+)</li>
                        <li>Téléphones Android récents avec ARCore</li>
                        <li>Appareils compatibles avec ARKit ou ARCore</li>
                    </ul>

                    <p>Si vous pensez que votre appareil devrait être compatible, vérifiez que votre navigateur est à jour.</p>
                </div>

                <div className="mt-6">
                    <a
                        href="https://immersiveweb.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                    >
                        En savoir plus sur WebXR
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotSupportedView;