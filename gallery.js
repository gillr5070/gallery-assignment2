// Array of image objects
const images = [
    { src: 'images/image1-large.jpg', thumbnail: 'images/image1-small.jpg', caption: 'Sunflowers in the hamlet Dernekamp, Kirchspiel, Dülmen, North Rhine-Westphalia, Germany' },
    { src: 'images/image2-large.jpg', thumbnail: 'images/image2-small.jpg', caption: 'Poppies in cornfield, Dülmen, North Rhine-Westphalia, Germany' },
    { src: 'images/image3-large.jpg', thumbnail: 'images/image3-small.jpg', caption: 'Daffodils in Sentmaring park, Münster, North Rhine-Westfalia, Germany' },
    { src: 'images/image4-large.jpg', thumbnail: 'images/image4-small.jpg', caption: 'Sentmaring Park, Münster, North Rhine-Westphalia, Germany' },
    { src: 'images/image5-large.jpg', thumbnail: 'images/image5-small.jpg', caption: 'Market in Münster, North Rhine-Westphalia, Germany' }
];

// Select elements
const featuredImage = document.getElementById('featured-image');
const imageCaption = document.getElementById('image-caption');
const thumbnailList = document.getElementById('thumbnail-list');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentIndex = 0;

// Function to update the featured image and caption
function updateFeaturedImage(index) {
    const image = images[index];
    featuredImage.src = image.src;
    imageCaption.textContent = image.caption;

    // Update thumbnail styles
    document.querySelectorAll('#thumbnail-list img').forEach(img => {
        img.classList.add('inactive');
        img.classList.remove('active');
    });

    // Set the active thumbnail
    const activeThumbnail = document.querySelector(`#thumbnail-list img[data-index="${index}"]`);
    activeThumbnail.classList.remove('inactive');
    activeThumbnail.classList.add('active');
}

// Function to open lightbox
function openLightbox(index) {
    const image = images[index];
    lightboxImage.src = image.src;
    lightboxCaption.textContent = image.caption;
    lightbox.classList.remove('hidden');
}

// Function to close lightbox
function closeLightbox() {
    lightbox.classList.add('hidden');
}

// Function to show the next image
function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateFeaturedImage(currentIndex);
}

// Function to show the previous image
function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateFeaturedImage(currentIndex);
}

// Dynamically build the thumbnail list
images.forEach((image, index) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = image.thumbnail;
    img.alt = image.caption;
    img.dataset.index = index;
    img.width = 240;
    img.height = 160;
    img.classList.add('inactive');
    img.addEventListener('click', () => {
        currentIndex = index;
        updateFeaturedImage(index);
        openLightbox(index);
    });
    li.appendChild(img);
    const caption = document.createElement('div');
    caption.className = 'thumbnail-caption';
    caption.textContent = image.caption;
    li.appendChild(caption);
    thumbnailList.appendChild(li);
});

// Set the initial featured image
updateFeaturedImage(currentIndex);

// Add event listeners
prevButton.addEventListener('click', showPreviousImage);
nextButton.addEventListener('click', showNextImage);
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        showNextImage();
    } else if (e.key === 'ArrowLeft') {
        showPreviousImage();
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
});
