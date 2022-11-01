import { ChangeEvent, InputHTMLAttributes } from "react";

interface Props extends Omit<InputHTMLAttributes<any>, 'onChange'> {
    className?: string;
    onChange: (value: string) => void;
}

export default function Input(props: Props) {
    const { className, children, onChange, ...other } = props;

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    }

    return (
        <input className={className} onChange={handleOnChange} {...other} />
    )
}
