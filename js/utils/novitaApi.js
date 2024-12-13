const NOVITA_API_KEY = process.env.NOVITA_API_KEY;

export async function processImageWithNovita(imageFile) {
    // First resize the image to meet Novita's requirements
    const resizedImage = await resizeImage(imageFile);
    
    try {
        // Initial request to start processing
        const taskResponse = await fetch('https://api.novita.ai/v3/async/task', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOVITA_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: resizedImage,
                // Add any other required parameters
            })
        });

        const taskData = await taskResponse.json();
        const taskId = taskData.task_id;

        // Poll for the result
        let status = '';
        let videoUrl = '';

        while (status !== 'TASK_STATUS_SUCCEED') {
            const statusResponse = await fetch(
                `https://api.novita.ai/v3/async/task-result?task_id=${taskId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${NOVITA_API_KEY}`,
                    },
                }
            );
            const statusData = await statusResponse.json();
            status = statusData.task?.status;

            if (status === 'TASK_STATUS_SUCCEED') {
                videoUrl = statusData.videos[0].video_url;
                return videoUrl;
            }

            if (status === 'TASK_STATUS_FAILED') {
                throw new Error('Failed to generate video');
            }

            // Wait before next check
            await new Promise(resolve => setTimeout(resolve, 2000));
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
                // Set desired dimensions
                const maxWidth = 1024;
                const maxHeight = 1024;
                
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