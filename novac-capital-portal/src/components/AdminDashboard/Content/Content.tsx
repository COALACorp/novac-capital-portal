import { useState, useEffect } from "react";
import Image from "next/image";

import type { Filter } from "../LateralMenu/LateralMenu";
import ApplicationsTable from "./ApplicationsTable/ApplicationsTable";
import ApplicationContent from "./ApplicationContent/ApplicationContent";
import { GetAllApplications, ApplicationsPagination } from "@/utils/api";

type ContentProps = {
    activeFilter?: Filter
    onLateralMenu?: () => void,
    onSignOut?: () => void,
};

function Content(props: ContentProps) {
    const [dropdown, setDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState<Filter|undefined>(props.activeFilter);
    const [search, setSearch] = useState<string>();
    const [applications, setApplications] = useState<ApplicationsPagination>()
    const [selectedApplication, setSelectedApplication] = useState<number>();
    const [loading, setLoading] = useState(false);

    const refreshApplications = () => {
        setLoading(true);
        GetAllApplications(6, currentPage, filter, search)
            .then(response => {
                setApplications(response?.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error on requesting page:", currentPage, error);
                setLoading(false);
            });
    };

    const handleSearch = (newSearch?: string) => {
        setSelectedApplication(undefined);
        setCurrentPage(1);
        setSearch(newSearch);
    };

    useEffect(() => {
        refreshApplications();
    }, [currentPage, filter, search]);

    useEffect(() => {
        setSelectedApplication(undefined);
        setCurrentPage(1);
        setFilter(props.activeFilter);
    }, [props.activeFilter]);

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
            {selectedApplication ? (
                <ApplicationContent
                    applicationId={selectedApplication}
                    onSearch={handleSearch}
                    onReturn={() => setSelectedApplication(undefined)}
                />
            ) : (
                <ApplicationsTable
                    applications={applications}
                    currentPage={currentPage}
                    searchValue={search}
                    loading={loading}
                    onRefresh={refreshApplications}
                    onSearch={handleSearch}
                    onApplication={setSelectedApplication}
                    onNext={() => setCurrentPage(currentPage + 1)}
                    onPrevious={() => setCurrentPage(currentPage - 1)}
                    onPage={page => setCurrentPage(page)}
                />
            )}
        </div>
    );
}

export default Content;