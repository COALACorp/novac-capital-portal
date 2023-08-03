import { useState, useEffect } from "react";
import Image from "next/image";


import type { Filter } from "../LateralMenu/LateralMenu";
import SearchBar from "./SearchBar";
import ContentTable from "./ContentTable";
import ContentRow from "./ContentRow";
import PaginationControls from "./PaginationControls";
import { GetAllApplications, ApplicationsPagination } from "@/utils/api";

type ContentProps = {
    activeFilter?: Filter
    onLateralMenu?: () => void,
    onSignOut?: () => void,
};

function Content(props: ContentProps) {
    const [dropdown, setDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState<Filter>();
    const [applications, setApplications] = useState<ApplicationsPagination>()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        GetAllApplications(6, currentPage, filter)
            .then(response => {
                setApplications(response?.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error on requesting page:", currentPage, error);
                setLoading(false);
            });
    }, [currentPage, filter]);

    useEffect(() => {
        if (props.activeFilter !== filter) {
            setCurrentPage(1);
            setFilter(props.activeFilter);
        }
    }, [props.activeFilter, filter])

    return (
        <div id="content-container">
            <div id="content-nav">
                <a id="content-nav-menu" onClick={props.onLateralMenu}>
                    <Image src="/icons/HamburguerMenu.svg" width="26" height="17" alt="Menu" />
                </a>
                <div id="content-nav-profile-container">
                    <a id="content-nav-profile" onClick={() => setDropdown(!dropdown)}>
                        <div id="content-nav-profile-info">
                            <Image id="content-nav-profile-picture" src="/profile.png" width="38" height="38" alt="Imagen de perfil" />
                            <p className="strong">NovacCapital</p>
                        </div>
                        <Image id="dropdown-arrow" className={dropdown ? "active" : ""} src="/icons/ArrowDown.svg" width="14" height="7" alt="" />
                    </a>
                    <div id="content-nav-profile-dropdown" hidden={!dropdown}>
                        <a onClick={props.onSignOut}>Cerrar Sesión</a>
                    </div>
                </div>
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