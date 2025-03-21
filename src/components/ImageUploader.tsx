import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { updateProductImages } from "../lib/productStorage";
import { AlertCircle, Upload, Check } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface ImageUploaderProps {
  productId: number;
  currentImages: string[];
  onImagesUpdated: (newImages: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  productId,
  currentImages,
  onImagesUpdated,
}) => {
  const [images, setImages] = useState<string[]>(currentImages);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(false);

    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    // In a real app, you would upload these to a server or cloud storage
    // For this demo, we'll convert them to data URLs
    const newImages: string[] = [];
    let loadedCount = 0;

    Array.from(files).forEach((file) => {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        setError(`File ${file.name} is not an image`);
        setIsUploading(false);
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(`File ${file.name} exceeds 5MB size limit`);
        setIsUploading(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string);
        }

        loadedCount++;
        if (loadedCount === files.length) {
          // All files have been processed
          const updatedImages = [...images, ...newImages];
          setImages(updatedImages);
          setIsUploading(false);

          // Update in storage
          const success = updateProductImages(productId, updatedImages);
          if (success) {
            setSuccess(true);
            onImagesUpdated(updatedImages);
            setTimeout(() => setSuccess(false), 3000);
          } else {
            setError("Failed to save images. Please try again.");
          }
        }
      };

      reader.onerror = () => {
        setError(`Error reading file ${file.name}`);
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleExternalImageAdd = () => {
    const url = prompt("Enter image URL:");
    if (!url) return;

    setError(null);
    setSuccess(false);

    // Basic URL validation
    if (!url.match(/^https?:\/\/.+\..+/)) {
      setError("Please enter a valid URL");
      return;
    }

    // Test if the image loads
    const img = new Image();
    img.onload = () => {
      const updatedImages = [...images, url];
      setImages(updatedImages);

      // Update in storage
      const success = updateProductImages(productId, updatedImages);
      if (success) {
        setSuccess(true);
        onImagesUpdated(updatedImages);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError("Failed to save image URL. Please try again.");
      }
    };

    img.onerror = () => {
      setError("Could not load image from the provided URL");
    };

    img.src = url;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="product-images">Upload Product Images</Label>
        <div className="flex items-center gap-2">
          <Input
            id="product-images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            className="flex-1"
            disabled={isUploading}
          />
          <Button
            variant="outline"
            onClick={handleExternalImageAdd}
            disabled={isUploading}
          >
            Add URL
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Upload product images (JPG, PNG, GIF). Max 5MB per file.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
          <Check className="h-4 w-4" />
          <AlertDescription>Images updated successfully!</AlertDescription>
        </Alert>
      )}

      {isUploading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1b5e20]"></div>
          <span className="ml-2">Uploading images...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
