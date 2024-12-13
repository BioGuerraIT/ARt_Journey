import { processImageWithNovita } from './novitaApi.js';

export async function handleFileUpload(file) {
    console.log('Starting file upload:', file);
    
    // Create a new file with a simpler name
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const timestamp = new Date().getTime();
    const simpleName = `image_${timestamp}.${fileExtension}`;
    const renamedFile = new File([file], simpleName, { type: file.type });
    
    const formData = new FormData();
    formData.append('image', renamedFile);

    try {
        // Start both requests in parallel
        const [mindFileResponse, videoUrl] = await Promise.all([
            // Mind file generation
            fetch('https://nftmarkergenerator-production.up.railway.app/create-nft', {
                method: 'POST',
                body: formData
            }),
            // Novita video generation
            processImageWithNovita(renamedFile)
        ]);

        if (!mindFileResponse.ok) {
            throw new Error(`Mind file generation failed: ${mindFileResponse.status}`);
        }

        const mindData = await mindFileResponse.json();
        console.log('Received responses:', { mind: mindData, video: videoUrl });
        
        if (!mindData.url) {
            throw new Error('No mind file URL received from server');
        }

        // Create object URL for the uploaded image
        const imageUrl = URL.createObjectURL(renamedFile);
        
        // Store all URLs in sessionStorage
        sessionStorage.setItem('mindFileUrl', mindData.url);
        sessionStorage.setItem('targetImageUrl', imageUrl);
        sessionStorage.setItem('videoUrl', videoUrl);
        
        return { mindData, videoUrl };
    } catch (error) {
        console.error('Upload error:', error);
        throw new Error(error.message || 'Failed to process image');
    }
}