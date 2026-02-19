import React from 'react';
import type { Route } from "./+types/visualizer.$id";
import { useLocation } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Visualizer - Roomify" },
    ];
}

export default function Visualizer({ params }: Route.ComponentProps) {
    const location = useLocation();
    const image = location.state?.image as string;

    return (
        <div className="visualizer">
            <h1>Visualizer: {params.id}</h1>
            {image && <img src={image} alt="Uploaded" className="max-w-md mt-4" />}
        </div>
    )
}
