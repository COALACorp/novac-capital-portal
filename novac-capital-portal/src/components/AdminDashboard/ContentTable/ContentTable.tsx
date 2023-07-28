import { ContentRowProps } from "./ContentRow";

type ContentTableProps = {
    children: React.ReactElement<ContentRowProps>|React.ReactElement<ContentRowProps>[],
};

function ContentTable(props: ContentTableProps) {
    return (
        <table id="content-table">
            <tr>
                <th>PLAZO</th>
                <th>NOMBRE</th>
                <th>TELÉFONO</th>
                <th>PROGRESO</th>
                <th>VALOR DEL EQUIPO</th>
                <th>FECHA</th>
            </tr>
            {props.children}
        </table>
    );
}

export default ContentTable;