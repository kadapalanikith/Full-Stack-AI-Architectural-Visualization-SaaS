import { Box, Download, RefreshCcw, Share2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "../../components/ui/Button";
import { generate3DView } from "../../lib/ai.action";

const VisualizerId = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { initialImage, initialRender, name } = (location.state || {}) as VisualizerLocationState;

    const hasInitialGenerated = useRef(false);

    const [isProcessing, setIsProcessing] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(initialImage || null);

    const handleBack = () => navigate('/');

    const runGeneration = async () => {
        if (!initialImage) return;
        try {
            setIsProcessing(true);
            const result = await generate3DView({ sourceImage: initialImage });

            if (result.renderedImage) {
                setCurrentImage(result.renderedImage);
            }
        } catch (error) {
            console.log('Generation failed', error);
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        if (!initialImage || hasInitialGenerated.current) return;
        if (initialRender) {
            setCurrentImage(initialRender);
            hasInitialGenerated.current = true;
            return;
        }
        hasInitialGenerated.current = true;
        runGeneration();
    }, [initialImage, initialRender]);

    return (
        <div className="visualizer">
            <nav className="topbar">
                <div className="brand">
                    <Box className="logo" />
                    <span>Roomify</span>
                </div>
                <Button variant='ghost' size='sm' onClick={handleBack} className="exit">
                    <X className='icon' /> Exit Editor
                </Button>
            </nav>
            <section className="content">
                <div className="pannel">
                    <div className="pannel-header">
                        <div className="pannel-meta">
                            <p>Project</p>
                            <h2>{name || 'Untitled Project'}</h2>
                            <p className="note">Created By You</p>
                        </div>
                        <div className="pannel-actions">
                            <Button size="sm" onClick={() => { }} className="export" disabled={!currentImage}>
                                <Download className="w-4 h-4 mr-2" /> Export
                            </Button>
                            <Button size="sm" onClick={() => { }} className="share">
                                <Share2 className="w-4 h-4 mr-2" /> Share
                            </Button>
                        </div>
                    </div>
                    <div className={`render-area ${isProcessing ? 'is-processing' : ''}`}>
                        {currentImage ? (
                            <img src={currentImage} alt="AI Render" className="render-img" />
                        ) : (
                            <div className="render-placeholder">
                                {initialImage && (
                                    <img src={initialImage} alt="Original" className="render-fallback" />
                                )}
                            </div>
                        )}
                        {isProcessing && (
                            <div className="render-overlay">
                                <div className="render-card">
                                    <RefreshCcw className="spinner" />
                                    <span className="title">Rendering..</span>
                                    <span className="subTitle">Generating your 3D Visualisation</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisualizerId;