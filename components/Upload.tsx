import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { PROGRESS_INCREMENT, PROGRESS_INTERVAL_MS, REDIRECT_DELAY_MS } from "../lib/constants";

interface UploadProps {
  onComplete?: (file: string) => void;
}

const Upload = ({ onComplete }: UploadProps) => {
  const [file, setfile] = useState<File | null>(null);
  const [isDragging, setisDragging] = useState(false);
  const [progress, setprogress] = useState(0);

  const { isSignedIn } = useOutletContext<AuthContext>();

  const processFile = (file: File) => {
    if (!isSignedIn) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setfile(file);

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += PROGRESS_INCREMENT;
        setprogress(Math.min(currentProgress, 100));

        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete(base64);
          }, REDIRECT_DELAY_MS);
        }
      }, PROGRESS_INTERVAL_MS);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isSignedIn) setisDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isSignedIn) setisDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isSignedIn) {
      setisDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        processFile(droppedFile);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSignedIn && e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="upload">
      {!file ? (
        <div
          className={`dropzone ${isDragging ? "is-dragged" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="drop-input"
            accept=".jpg,.jpeg,.png"
            disabled={!isSignedIn}
            onChange={handleChange}
          />
          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} />
            </div>
            <p className="">
              {isSignedIn
                ? "Click to upload or just drag and drop"
                : "Sign in or sign up with puter to upload"}
            </p>
            <p className="help">Maximum file size 50 MB</p>
          </div>
        </div>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
              {progress === 100 ? (
                <CheckCircle2 className="check" />
              ) : (
                <ImageIcon className="image" />
              )}
            </div>
            <h3>{file.name}</h3>
            <div className="progress">
              <div className="bar" style={{ width: `${progress}%` }} />
              <p className="status-text">
                {progress < 100 ? "Analyzing Floor Plan..." : "Redirecting..."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;