export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            style={{ color: "rgb(29,42,142)", cursor: "pointer" }}
            className={
                "rounded border-gray-300 shadow-sm focus:ring-sky-500 " +
                className
            }
        />
    );
}
