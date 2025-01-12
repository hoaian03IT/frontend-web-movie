import { FaCircleXmark } from "react-icons/fa6";

export function ValidationErrors({ errors = [] }: { errors: string[] }) {
    return (
        <div>
            {errors.map((error, index) => (
                <p key={index} className="flex items-center gap-1 text-red-600 text-[12px] my-1">
                    <FaCircleXmark className="size-3" />
                    <span className="flex-1">{error}</span>
                </p>
            ))}
        </div>
    );
}
