import SearchBar from "./SearchBar";
import ContentTable from "./ContentTable";
import ContentRow from "./ContentRow";
import PaginationControls from "./PaginationControls";
import { ApplicationsPagination } from "@/utils/api";

type ApplicationsTableProps = {
    applications?: ApplicationsPagination,
    currentPage: number,
    loading?: boolean,
    onSearch?: (search?: string) => void,
    onNext?: () => void,
    onPrevious?: () => void,
    onPage?: (page: number) => void,
};

function ApplicationsTable(props: ApplicationsTableProps) {
    return (
        <>
            <div id="content-header">
                <p id="content-header-title" className="strong">Dashboard</p>
                <SearchBar onSearch={props.onSearch} />
            </div>
            <ContentTable disabled={props.loading}>
                {props.applications && props.applications.applications.map((application, index) => (
                    <ContentRow
                        key={index}
                        applicationId={application.id}
                        months={application.planId}
                        name={application.name}
                        equipment={application.equipment}
                        progress={Math.round(application.progress * 100)}
                        advanceAmount={application.advanceAmount}
                        amount={application.cost}
                        date={new Date(application.createdAt).toLocaleDateString()}
                    />
                ))}
            </ContentTable>
            <PaginationControls
                min={props.applications ? 1 : 0}
                max={props.applications?.pagination.last ?? 0}
                currentPage={props.currentPage}
                pageResults={6}
                totalResults={props.applications?.pagination.count ?? 0}
                disabled={props.loading}
                onNext={props.onNext}
                onPrevious={props.onPrevious}
                onPage={props.onPage}
            />
        </>
    );
}

export default ApplicationsTable;