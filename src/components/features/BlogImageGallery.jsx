import React, { useState } from 'react';
import '../../styles/components/blog-image-gallery.css';

const BlogImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="blog-image-gallery">
        <h3 className="gallery-title">More Images</h3>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div
              key={index}
              className="gallery-item"
              onClick={() => openImage(image)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="gallery-image"
              />
              {image.caption && (
                <div className="gallery-caption">{image.caption}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeImage}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeImage}>
              <i className="fas fa-times"></i>
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="lightbox-image"
            />
            {selectedImage.caption && (
              <div className="lightbox-caption">{selectedImage.caption}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogImageGallery;