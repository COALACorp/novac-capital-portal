import Image from "next/image";

import { formatAmount } from "@/utils/formats";

type ContentRowProps = {
    months: number|string,
    name: string,
    picture?: string,
    phone: string,
    progress: number,
    amount: number,
    date: string,
};

function ContentRow(props: ContentRowProps) {
    return (
        <tr>
            <td>
                <div className="term">
                    <p className="months">{props.months}</p>
                    <p>meses</p>
                </div>
            </td>
            <td>
                <div className="name">
                    {props.picture && <Image className="profile-pic" src={props.picture} width="40" height="40" alt="" />}
                    <p>{props.name}</p>
                </div>
            </td>
            <td>
                <p>{props.phone}</p>
            </td>
            <td>
                <div className="progress">
                    <div className="bar">
                        <div className="indicator" style={{ width: (props.progress + "%") }} />
                    </div>
                    <p>{props.progress}%</p>
                </div>
            </td>
            <td>
                <p>${formatAmount(props.amount)}</p>
            </td>
            <td>
                <p>{props.date}</p>
            </td>
        </tr>
    );
}

export default ContentRow;
export type { ContentRowProps };