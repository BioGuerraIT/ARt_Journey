import { handleFileUpload } from '../utils/fileHandlers.js';
import { showLoadingSpinner, hideLoadingSpinner, showNotification } from '../utils/ui.js';
import { SUPPORTED_FILE_TYPES } from '../config/constants.js';
import { navigate } from '../main.js';

export function renderCreatePage(container) {
    container.innerHTML = `
        <div class="create-page">
            <div class="upload-container">
                <h2>Upload Image</h2>
                <input type="file" id="fileInput" accept="image/jpeg,image/png">
                <label for="fileInput" class="upload-area">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Click to upload or drag and drop</p>
                    <p class="small">Supports: JPG, PNG</p>
                </label>
                <div id="imagePreview" class="image-preview" style="display: none;">
                    <img src="" alt="Preview" id="previewImg">
                </div>
                <button class="btn" id="uploadBtn">Process Image</button>
            </div>
        </div>
    `;

    setupUploadHandlers(container);
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