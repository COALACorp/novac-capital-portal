import { useState, useEffect } from "react";
import Image from "next/image";

import SearchBar from "./SearchBar";
import ContentTable from "./ContentTable";
import ContentRow from "./ContentRow";
import PaginationControls from "./PaginationControls";
import { GetAllApplications, ApplicationsPagination } from "@/utils/api";

type ContentProps = {
    onLateralMenu?: () => void,
};

function Content(props: ContentProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [applications, setApplications] = useState<ApplicationsPagination>()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        GetAllApplications(6, currentPage)
            .then(response => {
                setApplications(response?.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error on requesting page:", currentPage, error);
                setLoading(false);
            });
    }, [currentPage]);

    return (
        <div id="content-container">
            <div id="content-nav">
                <a id="content-nav-menu" onClick={props.onLateralMenu}>
                    <Image src="/icons/HamburguerMenu.svg" width="26" height="17" alt="Menu" />
                </a>
                <a id="content-nav-profile" onClick={() => console.log("Content profile")}>
                    <div id="content-nav-profile-info">
                        <Image id="content-nav-profile-picture" src="/profile.png" width="38" height="38" alt="Imagen de perfil" />
                        <p className="strong">NovacCapital</p>
                    </div>
                    <Image src="/icons/ArrowDown.svg" width="14" height="7" alt="" />
                </a>
            </div>
            <div id="content-header">
                <p id="content-header-title" className="strong">Dashboard</p>
                <SearchBar />
            </div>
            <ContentTable>
                {applications && applications.applications.map((application, index) => (
                    <ContentRow
                        key={index}
                        applicationId={application.id}
                        months={application.planId}
                        name={application.name}
                        equipment={application.equipment}
                        progress={application.progress * 100}
                        amount={application.cost}
                        date={new Date(application.createdAt).toLocaleDateString()}
                    />
                ))}
            </ContentTable>
            <PaginationControls
                min={applications ? 1 : 0}
                max={applications?.pagination.last ?? 0}
                currentPage={currentPage}
                pageResults={6}
                totalResults={applications?.pagination.count ?? 0}
                disabled={loading}
                onNext={() => setCurrentPage(currentPage + 1)}
                onPrevious={() => setCurrentPage(currentPage - 1)}
                onPage={page => setCurrentPage(page)}
            />
        </div>
    );
}

export default Content;