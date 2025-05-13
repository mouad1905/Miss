import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

export default function Sidebar({ setCurrentSection }) {
    const [openReferentiel, setOpenReferentiel] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const handleClick = (section) => {
        // setActiveItem(section);
        setCurrentSection(section); // ou ta logique personnalisée
    };
    

    return (
        <div className="w-64 min-h-screen bg-white shadow-md p-4">
            {/* Référentiel */}
            <div>
                <button
                    onClick={() => setOpenReferentiel(!openReferentiel)}
                    className="flex items-center justify-between w-full text-left text-gray-800 font-medium hover:bg-orange-100 px-2 py-2 rounded transition"
                >
                    Référentiel
                    {openReferentiel ? (
                        <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                        <ChevronDownIcon className="w-5 h-5" />
                    )}
                </button>

                {openReferentiel && (
                    <div className="ml-4 mt-1 space-y-1 text-sm">
                        {[
                            { label: 'Article', key: 'article' },
                            { label: 'Bureau', key: 'bureau' },
                            { label: 'Catégorie de fournisseur', key: 'categorie-fournisseur' },
                            { label: 'Division', key: 'division' },
                            { label: 'Fournisseur', key: 'fournisseur' },
                            { label: 'Catégorie d\'article', key: 'categorie-article' },
                            { label: 'Catégorie de consommable', key: 'categorie-consommable' },
                            { label: 'Catégorie d\'employé', key: 'categorie-employer' },
                            { label: 'Service', key: 'service' },
                            { label: 'Utilisateur', key: 'utilisateur' },
                        ].map(({ label, key }) => (
                            <button
                                key={key}
                                onClick={() => handleClick(key)}
                                className={`block w-full text-left px-2 py-1 rounded transition ${
                                    activeItem === key
                                        ? 'bg-orange-200 text-orange-800 font-semibold'
                                        : 'hover:bg-orange-100 text-gray-700'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
