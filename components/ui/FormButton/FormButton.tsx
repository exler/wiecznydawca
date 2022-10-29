import { ButtonHTMLAttributes, forwardRef, useRef } from "react";
import { mergeRefs } from 'react-merge-refs';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    loading?: boolean;
    Component?: React.ComponentType;
}

const FormButton = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
    const { className, children, active, loading = false, disabled = false, style = {}, Component = 'button', ...other } = props;
    const ref = useRef(null);

    return (
        <Component
            aria-pressed={active}
            ref={mergeRefs([ref, buttonRef])}
            className={className}
            disabled={disabled}
            style={{ ...style }}
            {...other}
        >
            {!loading ? children : 'Loading...'}
        </Component>
    )
});

FormButton.displayName = 'FormButton';
export default FormButton;
