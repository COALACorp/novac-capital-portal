import Box from "@mui/material/Box";
import Image from "next/image";
import { ContentRowProps } from "./ContentRow";

type ContentTableProps = {
    children: React.ReactElement<ContentRowProps>|React.ReactElement<ContentRowProps>[],
};

function ContentTable(props: ContentTableProps) {
    return (
        <table id="content-table">
            <thead>
                <tr>
                    <th>PLAZO</th>
                    <th>NOMBRE</th>
                    <th>TELÉFONO</th>
                    <th>PROGRESO</th>
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