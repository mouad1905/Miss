import { useState } from 'react';
import Sidebar from '../Layouts/Sidebar';
import Article from './Referentiel/Article';

export default function Dashboard() {
    const [currentSection, setCurrentSection] = useState(null);

    const renderSection = () => {
        switch (currentSection) {
            case 'article':
                return <Article />;
            // Ajoute les autres sections ici
            default:
                return <div>Bienvenue sur le tableau de bord</div>;
        }
    };

    return (
        <div className="flex">
            <Sidebar setCurrentSection={setCurrentSection} />
            <main className="flex-1 p-4">
                {renderSection()}
            </main>
        </div>
    );
}
