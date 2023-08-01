import "@/styles/form.css";

type FormHeadingProps = {
    title: string,
    subtitle?: string,
};

function FormHeading(props: FormHeadingProps) {
    return (
        <div id="form-heading-container">
            <div id="form-heading">
                <h1 className="strong">
                    {props.title}
                </h1>
                {props.subtitle && (
                    <h2>
                        {props.subtitle}
                    </h2>
                )}
            </div>
        </div>
    );
}

export default FormHeading;