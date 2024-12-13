const NOVITA_API_KEY = import.meta.env.VITE_NOVITA_API_KEY;

export async function processImageWithNovita(imageFile) {
    const resizedImage = await resizeImage(imageFile);
    try {
        // Initial request to start processing
        const taskResponse = await fetch('https://api.novita.ai/v3/async/img2video', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOVITA_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model_name: "SVD-XT",
                image_file: resizedImage.split(',')[1],
                frames_num: 25,
                frames_per_second: 6,
                image_file_resize_mode: "CROP_TO_ASPECT_RATIO",
                steps: 20,
                seed: Math.floor(Date.now() / 1000),
                enable_frame_interpolation: true,
                extra: {
                    response_video_type: "mp4"
                }
            })
        });

        if (!taskResponse.ok) {
            const errorData = await taskResponse.text();
            throw new Error(`Failed to start video generation: ${errorData}`);
        }

        const taskData = await taskResponse.json();
        const taskId = taskData.task_id;

        console.log('Video generation started with task ID:', taskId);

        // Poll for the result
        let status = '';
        let videoUrl = '';
        let attempts = 0;
        const maxAttempts = 30; // Maximum polling attempts (2 minutes with 4-second intervals)

        while (status !== 'TASK_STATUS_SUCCEED' && attempts < maxAttempts) {
            attempts++;
            
            const statusResponse = await fetch(
                `https://api.novita.ai/v3/async/task-result?task_id=${taskId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${NOVITA_API_KEY}`,
                    },
                }
            );

            if (!statusResponse.ok) {
                throw new Error('Failed to check video status');
            }

            const statusData = await statusResponse.json();
            status = statusData.task?.status;
            console.log('Video generation status:', status);

            if (status === 'TASK_STATUS_SUCCEED') {
                if (statusData.videos && statusData.videos.length > 0) {
                    videoUrl = statusData.videos[0].video_url;
                    console.log('Video generation completed:', videoUrl);
                    return videoUrl;
                } else {
                    throw new Error('No video URL in successful response');
                }
            }

            if (status === 'TASK_STATUS_FAILED') {
                throw new Error(`Video generation failed: ${statusData.task?.reason || 'Unknown error'}`);
            }

            // Wait 4 seconds before next check
            await new Promise(resolve => setTimeout(resolve, 4000));
        }

        if (attempts >= maxAttempts) {
            throw new Error('Video generation timed out');
        }

    } catch (error) {
        console.error('Novita API error:', error);
        throw error;
    }
}

async function resizeImage(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                // Set dimensions according to API requirements (max 2048x2048)
                const maxWidth = 2048;
                const maxHeight = 2048;
                
                let width = img.width;
                let height = img.height;
                
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert to base64
                resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
} 