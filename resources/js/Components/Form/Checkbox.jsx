export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            style={{ color: "#1976d2", cursor: "pointer" }}
            className={
                "rounded border-gray-300 shadow-sm focus:ring-sky-500 " +
                className
            }
        />
    );
}
