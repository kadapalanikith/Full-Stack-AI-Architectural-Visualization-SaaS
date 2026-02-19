import type { Route } from "./+types/visualizer.$id";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Visualizer - Roomify" },
    ];
}

export default function Visualizer({ params }: Route.ComponentProps) {
    const [image, setImage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (params.id) {
            const storedImage = sessionStorage.getItem(`roomify-image-${params.id}`);
            if (storedImage) {
                setImage(storedImage);
            } else {
                // Fallback: Redirect to home or show error
                // For now, we'll just let the UI show "Floor plan not found"
            }
        }
    }, [params.id]);

    return (
        <div className="visualizer">
            <h1>Visualizer: {params.id}</h1>
            {image ? (
                <img src={image} alt="Uploaded" className="max-w-md mt-4" />
            ) : (
                <div className="text-center mt-10">
                    <p className="text-gray-500">Floor plan not found or expired.</p>
                    <button onClick={() => navigate("/")} className="text-blue-500 underline mt-2">
                        Go back to upload
                    </button>
                </div>
            )}
        </div>
    )
}
