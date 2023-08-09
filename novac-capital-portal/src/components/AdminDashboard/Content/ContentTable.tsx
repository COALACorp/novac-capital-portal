import { ContentRowProps } from "./ContentRow";

type ContentTableProps = {
    disabled?: boolean,
    children: React.ReactElement<ContentRowProps>|React.ReactElement<ContentRowProps>[]|any,
};

function ContentTable(props: ContentTableProps) {
    return (
        <table id="content-table" className={props.disabled ? "disabled" : ""}>
            <thead>
                <tr>
                    <th>PLAZO</th>
                    <th>NOMBRE</th>
                    <th>EQUIPO</th>
                    <th>PROGRESO</th>
                    <th>ANTICIPO</th>
                    <th>VALOR DEL EQUIPO</th>
                    <th>FECHA</th>
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    );
}

export default ContentTable;