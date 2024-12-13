import { handleFileUpload } from '../utils/fileHandlers.js';
import { showLoadingSpinner, hideLoadingSpinner, showNotification } from '../utils/ui.js';
import { navigate } from '../main.js';

export function renderCreatePage(container) {
    container.innerHTML = `
        <div class="create-page">
            <div class="upload-container">
                <h2>Upload Image</h2>
                <div class="capture-options">
                    <button class="btn capture-btn" id="cameraBtn">
                        <i class="fas fa-camera"></i>
                        Take Photo
                    </button>
                    <p class="or">or</p>
                    <input type="file" id="fileInput" accept="image/jpeg,image/png">
                    <label for="fileInput" class="upload-area">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Click to upload or drag and drop</p>
                        <p class="small">Supports: JPG, PNG (512x512 recommended)</p>
                    </label>
                </div>
                <div id="imagePreview" class="image-preview" style="display: none;">
                    <img src="" alt="Preview" id="previewImg">
                </div>
                <button class="btn" id="uploadBtn">Process Image</button>
            </div>
        </div>

        <!-- Camera Modal -->
        <div id="cameraModal" class="camera-modal" style="display: none;">
            <div class="camera-container">
                <video id="cameraFeed" autoplay playsinline></video>
                <canvas id="captureCanvas" width="512" height="512" style="display: none;"></canvas>
                <div class="camera-controls">
                    <button class="btn" id="captureBtn">
                        <i class="fas fa-camera"></i>
                    </button>
                    <button class="btn cancel-btn" id="closeCamera">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    setupUploadHandlers(container);
    setupCameraHandlers(container);
}

function setupCameraHandlers(container) {
    const cameraBtn = container.querySelector('#cameraBtn');
    const cameraModal = container.querySelector('#cameraModal');
    const closeCamera = container.querySelector('#closeCamera');
    const captureBtn = container.querySelector('#captureBtn');
    const video = container.querySelector('#cameraFeed');
    const canvas = container.querySelector('#captureCanvas');
    const fileInput = container.querySelector('#fileInput');
    const previewImg = container.querySelector('#previewImg');
    const imagePreview = container.querySelector('#imagePreview');
    let stream = null;

    async function startCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: { ideal: 512 },
                    height: { ideal: 512 }
                }
            });
            video.srcObject = stream;
            cameraModal.style.display = 'flex';
        } catch (err) {
            console.error('Error accessing camera:', err);
            showNotification('Could not access camera', 'error');
        }
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
        cameraModal.style.display = 'none';
    }

    function capturePhoto() {
        const context = canvas.getContext('2d');
        // Draw video frame to canvas, maintaining aspect ratio
        const size = Math.min(video.videoWidth, video.videoHeight);
        const x = (video.videoWidth - size) / 2;
        const y = (video.videoHeight - size) / 2;
        context.drawImage(video, x, y, size, size, 0, 0, 512, 512);
        
        // Convert to file
        canvas.toBlob((blob) => {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            fileInput.files = createFileList([file]);
            previewImg.src = URL.createObjectURL(file);
            imagePreview.style.display = 'block';
            stopCamera();
        }, 'image/jpeg', 0.9);
    }

    cameraBtn.addEventListener('click', startCamera);
    closeCamera.addEventListener('click', stopCamera);
    captureBtn.addEventListener('click', capturePhoto);
}

// Helper function to create a FileList object
function createFileList(files) {
    const dt = new DataTransfer();
    files.forEach(file => dt.items.add(file));
    return dt.files;
}

function setupUploadHandlers(container) {
    const fileInput = container.querySelector('#fileInput');
    const uploadBtn = container.querySelector('#uploadBtn');
    const uploadArea = container.querySelector('.upload-area');
    const imagePreview = container.querySelector('#imagePreview');
    const previewImg = container.querySelector('#previewImg');

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            previewImg.src = URL.createObjectURL(file);
            imagePreview.style.display = 'block';
        }
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#2563eb';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#cbd5e1';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#cbd5e1';
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
        }
    });

    uploadBtn.addEventListener('click', async () => {
        const file = fileInput.files[0];
        if (!file) {
            showNotification('Please select a file first', 'error');
            return;
        }

        showLoadingSpinner();
        try {
            await handleFileUpload(file);
            showNotification('Upload successful!', 'success');
            navigate('ar');
        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            hideLoadingSpinner();
        }
    });
}