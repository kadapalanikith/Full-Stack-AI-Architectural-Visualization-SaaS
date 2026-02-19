import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router";
import { PROGRESS_INCREMENT, PROGRESS_INTERVAL_MS, REDIRECT_DELAY_MS } from "../lib/constants";

interface UploadProps {
  onComplete?: (file: string) => void;
}

const Upload = ({ onComplete }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileData, setFileData] = useState<string | null>(null);

  const { isSignedIn } = useOutletContext<AuthContext>();

  // Use a ref to track if component is mounted to prevent state updates after unmount
  // detailed usage: mainly for the delayed onComplete call
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Progress simulation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isUploading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = Math.min(prev + PROGRESS_INCREMENT, 100);
          if (next >= 100) {
            clearInterval(interval);
            setIsUploading(false); // Stop the interval effect
            // Delay the completion callback to allow the progress bar to show 100%
            setTimeout(() => {
              if (isMounted.current && onComplete && fileData) {
                onComplete(fileData);
              }
            }, REDIRECT_DELAY_MS);
          }
          return next;
        });
      }, PROGRESS_INTERVAL_MS);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isUploading, fileData, onComplete]);

  const processFile = (file: File) => {
    if (!isSignedIn) return;

    // Validation
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPG, PNG).");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("File size exceeds 50MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setFile(file);
      setFileData(base64);
      setIsUploading(true);
      setProgress(0);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isSignedIn) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isSignedIn) setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isSignedIn) {
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        processFile(droppedFile);
      }
    } else {
      setIsDragging(false);
      // Feedback for signed out state
      alert("Please sign in to upload files.");
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