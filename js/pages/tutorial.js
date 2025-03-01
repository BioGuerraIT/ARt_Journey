export function renderTutorialPage(container) {
    container.innerHTML = `
        <header class="header">
            <div class="header-content">
                <h1>
                    <i class="fas fa-book icon"></i>
                    How to Use ARt Journey
                </h1>
            </div>
        </header>
        <div class="tutorial-container">
            <div class="tutorial-section">
                <h2><i class="fas fa-images"></i> Gallery Mode</h2>
                <div class="tutorial-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h3>Browse the Gallery</h3>
                        <p>Explore street art from San Francisco in the Gallery tab.</p>
                        <div class="tutorial-image">
                            <i class="fas fa-image fa-4x"></i>
                        </div>
                    </div>
                </div>
                <div class="tutorial-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h3>Select an Artwork</h3>
                        <p>Tap on any artwork to view it in augmented reality.</p>
                        <div class="tutorial-image">
                            <i class="fas fa-hand-pointer fa-4x"></i>
                        </div>
                    </div>
                </div>
                <div class="tutorial-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h3>Scan the Artwork</h3>
                        <p>Point your camera at the actual artwork or image to see it come to life with AR animation.</p>
                        <div class="tutorial-image">
                            <i class="fas fa-camera fa-4x"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tutorial-section">
                <h2><i class="fas fa-plus"></i> Create Mode</h2>
                <div class="tutorial-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h3>Upload an Image</h3>
                        <p>Take a photo or upload an image you want to enhance with AR.</p>
                        <div class="tutorial-image">
                            <i class="fas fa-upload fa-4x"></i>
                        </div>
                    </div>
                </div>
                <div class="tutorial-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h3>Process the Image</h3>
                        <p>Click "Process Image" and wait while we prepare your AR experience.</p>
                        <div class="tutorial-image">
                            <i class="fas fa-cogs fa-4x"></i>
                        </div>
                    </div>
                </div>
                <div class="tutorial-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h3>Experience Your Creation</h3>
                        <p>Once processing is complete, point your camera at your original image to see the AR animation.</p>
                        <div class="tutorial-image">
                            <i class="fas fa-magic fa-4x"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tutorial-section">
                <h2><i class="fas fa-lightbulb"></i> Tips</h2>
                <ul class="tips-list">
                    <li><i class="fas fa-check-circle"></i> Use well-lit images with distinct features for best AR tracking</li>
                    <li><i class="fas fa-check-circle"></i> Hold your device steady when scanning images</li>
                    <li><i class="fas fa-check-circle"></i> Images with high contrast work best</li>
                    <li><i class="fas fa-check-circle"></i> Make sure your camera has permission to access AR features</li>
                </ul>
            </div>
        </div>
    `;
} 