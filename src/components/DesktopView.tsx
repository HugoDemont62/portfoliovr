// @ts-ignore
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const DesktopView = () => {
    // Récupère l'URL actuelle pour générer le QR code
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-md mx-auto text-center bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6">Expérience VR Portfolio</h1>

                <div className="mb-6">
                    <p className="text-xl mb-4">Cette expérience est conçue pour les appareils mobiles uniquement.</p>
                    <p className="mb-4">Pour une expérience optimale, veuillez scanner le QR code ci-dessous avec votre téléphone ou visiter directement cette URL sur votre appareil mobile.</p>
                </div>

                <div className="bg-white p-4 rounded-lg inline-block mb-6">
                    <QRCodeSVG
                        value={currentUrl}
                        size={200}
                        level="H"
                    />
                </div>

                <div className="text-sm text-gray-400">
                    <p>Assurez-vous que votre appareil mobile prend en charge WebXR pour une expérience immersive.</p>
                </div>
            </div>
        </div>
    );
};

export default DesktopView;