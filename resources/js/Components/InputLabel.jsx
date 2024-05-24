export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-xl text-white ` + className}>
            {value ? value : children}
        </label>
    );
}
