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
        const response = await fetch('https://nftmarkergenerator-production.up.railway.app/create-nft', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Upload failed:', errorText);
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Received response:', data);
        
        if (!data.success) {
            throw new Error(data.message || 'Server processing failed');
        }

        if (!data.markerUrl || !data.videoUrl) {
            throw new Error('Missing marker or video URL in server response');
        }

        // Create object URL for the uploaded image
        const imageUrl = URL.createObjectURL(renamedFile);
        
        // Store URLs in sessionStorage
        sessionStorage.setItem('mindFileUrl', data.markerUrl);
        sessionStorage.setItem('targetImageUrl', imageUrl);
        sessionStorage.setItem('videoUrl', data.videoUrl);
        
        return data;
    } catch (error) {
        console.error('Upload error:', error);
        throw new Error(error.message || 'Failed to process image');
    }
}