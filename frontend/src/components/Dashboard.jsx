import { useState, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import Article from "./Referentiel/Article";
import CategoryList from "./CategoryList";

export default function Dashboard() {
    console.log("Dashboard component is rendering");
    const [currentSection, setCurrentSection] = useState("dashboard");

    useEffect(() => {
        console.log("Dashboard currentSection:", currentSection);
    }, [currentSection]);

    const renderSection = () => {
        console.log("Rendering section:", currentSection);
        switch (currentSection) {
            case "article":
                return <Article />;
            case "categories":
                return <CategoryList />;
            case "users":
                return <div>Gestion des utilisateurs</div>;
            case "dashboard":
                return (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h1 className="text-2xl font-bold mb-4">
                            Tableau de bord
                        </h1>
                        <p className="text-gray-600">
                            Bienvenue dans l'interface d'administration.
                            Utilisez le menu latéral pour naviguer.
                        </p>
                    </div>
                );
            default:
                return (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h1 className="text-xl font-bold text-red-600">
                            Section non disponible
                        </h1>
                        <p className="text-gray-600">
                            La section <strong>{currentSection}</strong> n’est
                            pas encore implémentée.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="flex">
            <Sidebar setCurrentSection={setCurrentSection} />
            <main className="flex-1 p-4 bg-gray-100 min-h-screen">
                {renderSection()}
            </main>
        </div>
    );
}
