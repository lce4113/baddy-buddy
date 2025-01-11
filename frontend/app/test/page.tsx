"use client"

import { useState } from 'react';

export default function VideoUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('video', file);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                setStatus(`Upload successful: ${result.message}`);
            } else {
                setStatus(`Error: ${result.error}`);
            }
        } catch (error) {
            setStatus('Upload failed. Please try again.');
        }
    };

    return (
        <div>
            <h1>Upload Video</h1>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {status && <p>{status}</p>}
        </div>
    );
}
