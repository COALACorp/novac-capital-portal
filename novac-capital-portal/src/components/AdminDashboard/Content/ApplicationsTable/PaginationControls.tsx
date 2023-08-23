import Image from "next/image";

const MARGIN = 1;

type PaginationControlsProps = {
    min: number,
    max: number,
    currentPage: number,
    pageResults: number,
    totalResults: number,
    disabled?: boolean,
    onPrevious?: () => void,
    onNext?: () => void,
    onPage?: (page: number) => void,
};

function PaginationControls(props: PaginationControlsProps) {
    const resultCount = ((props.currentPage - 1) * props.pageResults);

    return (
        <div id="content-pagination" className={props.disabled ? "disabled" : ""}>
            <p id="pagination-label"><span>{resultCount + 1}-{(resultCount + props.pageResults) > props.totalResults ? props.totalResults : (resultCount + props.pageResults)}</span> de {props.totalResults}</p>
            <div id="pagination-controls">
                {props.currentPage > props.min && (
                    <a className="pagination-control-arrow" onClick={props.onPrevious}>
                        <Image src="/icons/PaginationLeftArrow.svg" width="6" height="12" alt="" />
                    </a>
                )}
                <div id="pagination-numeration">
                    {[...Array(props.max - (props.min - 1)).keys()].map((value, index) => {
                        const page = value + 1;
                        if ([props.min, props.currentPage - MARGIN, props.currentPage, props.currentPage + MARGIN, props.max].includes(page))
                            if (props.currentPage === page)
                                return <p key={index} id="page-selected">{page}</p>;
                            else
                                return <a key={index} onClick={() => props.onPage && props.onPage(page)}>{page}</a>;
                        else
                            return "...";
                    }).filter((value, index, array) => index === 0 || value !== array[index - 1])}
                </div>
                {props.currentPage < props.max && (
                    <a className="pagination-control-arrow" onClick={props.onNext}>
                        <Image src="/icons/PaginationRightArrow.svg" width="6" height="12" alt="" />
                    </a>
                )}
            </div>
        </div>
    );
}

export default PaginationControls;