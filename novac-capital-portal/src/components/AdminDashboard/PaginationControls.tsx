import Image from "next/image";

const MARGIN = 1;

type PaginationControlsProps = {
    min: number,
    max: number,
    currentPage: number,
    pageResults: number,
    totalResults: number,
    onPrevious?: () => void,
    onNext?: () => void,
    onPage?: (page: number) => void,
};

function PaginationControls(props: PaginationControlsProps) {
    return (
        <div id="content-pagination">
            <p id="pagination-label"><span>{((props.currentPage - 1) * props.pageResults) + 1}-{(((props.currentPage - 1) * props.pageResults)) + props.pageResults}</span> de {props.totalResults}</p>
            <div id="pagination-controls">
                {props.currentPage > props.min && (
                    <a className="pagination-control-arrow" onClick={props.onPrevious}>
                        <Image src="/icons/PaginationLeftArrow.svg" width="6" height="12" alt="" />
                    </a>
                )}
                <div id="pagination-numeration">
                    {[...Array(props.max - (props.min - 1)).keys()].map(value => {
                        const page = value + 1;
                        if ([props.min, props.currentPage - MARGIN, props.currentPage, props.currentPage + MARGIN, props.max].includes(page))
                            if (props.currentPage === page)
                                return <p id="page-selected">{page}</p>;
                            else
                                return <a onClick={() => props.onPage && props.onPage(page)}>{page}</a>;
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