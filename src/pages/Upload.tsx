import { useState, useRef, ChangeEvent } from 'react';
import { AlertCircle, Play, Upload as UploadIcon, X, CheckCircle, Image as ImageIcon, FileText } from 'lucide-react';

// File type interface
interface FileInfo {
  file: File;
  preview: string;
  name: string;
  size: string;
  type: string;
  isValid: boolean;
  errorMessage?: string;
}

const Upload = () => {
  const [videoFile, setVideoFile] = useState<FileInfo | null>(null);
  const [imageFile, setImageFile] = useState<FileInfo | null>(null);
  const [subtitleFile, setSubtitleFile] = useState<FileInfo | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const subtitleInputRef = useRef<HTMLInputElement>(null);
  
  // Helper to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Validate file types
  const validateFileType = (file: File, allowedTypes: string[]): { isValid: boolean; message?: string } => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    
    if (!allowedTypes.includes(fileExtension)) {
      return { 
        isValid: false, 
        message: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` 
      };
    }
    
    return { isValid: true };
  };
  
  // Handle video file upload
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const validation = validateFileType(file, ['mp4', 'avi', 'mov', 'webm']);
    
    const fileInfo: FileInfo = {
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      isValid: validation.isValid,
      errorMessage: validation.message,
    };
    
    setVideoFile(fileInfo);
  };
  
  // Handle image file upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const validation = validateFileType(file, ['jpg', 'jpeg', 'png', 'gif']);
    
    const fileInfo: FileInfo = {
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      isValid: validation.isValid,
      errorMessage: validation.message,
    };
    
    setImageFile(fileInfo);
  };
  
  // Handle subtitle file upload
  const handleSubtitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const validation = validateFileType(file, ['srt', 'vtt']);
    
    const fileInfo: FileInfo = {
      file,
      preview: '',
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      isValid: validation.isValid,
      errorMessage: validation.message,
    };
    
    setSubtitleFile(fileInfo);
  };
  
  // Handle file removal
  const handleRemoveFile = (type: 'video' | 'image' | 'subtitle') => {
    if (type === 'video') {
      if (videoFile?.preview) URL.revokeObjectURL(videoFile.preview);
      setVideoFile(null);
      if (videoInputRef.current) videoInputRef.current.value = '';
    } else if (type === 'image') {
      if (imageFile?.preview) URL.revokeObjectURL(imageFile.preview);
      setImageFile(null);
      if (imageInputRef.current) imageInputRef.current.value = '';
    } else if (type === 'subtitle') {
      setSubtitleFile(null);
      if (subtitleInputRef.current) subtitleInputRef.current.value = '';
    }
  };
  
  // Handle simulated upload
  const handleUpload = () => {
    // Validate that we have at least a video file
    if (!videoFile || !videoFile.isValid) {
      return;
    }
    
    setIsUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Video</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video upload section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Video File</h2>
            
            {videoFile ? (
              <div className="space-y-4">
                {!videoFile.isValid ? (
                  <div className="flex items-start p-4 bg-red-50 dark:bg-red-900/20 rounded-md text-red-600 dark:text-red-400">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Invalid file</p>
                      <p className="text-sm">{videoFile.errorMessage}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <video 
                      src={videoFile.preview} 
                      className="w-full h-full object-contain"
                      controls
                    />
                    <button
                      onClick={() => handleRemoveFile('video')}
                      className="absolute top-2 right-2 p-1 rounded-full bg-gray-800/70 text-white hover:bg-gray-800"
                      aria-label="Remove video"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-primary/10 dark:bg-primary/20 mr-3">
                      <Play size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{videoFile.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{videoFile.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFile('video')}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => videoInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-primary dark:hover:border-primary transition-colors"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                  <UploadIcon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Drag and drop video file here
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Supported formats: MP4, AVI, MOV, WEBM
                </p>
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                  Browse Files
                </button>
              </div>
            )}
            
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleVideoChange}
              accept=".mp4,.avi,.mov,.webm"
              className="hidden"
            />
          </div>
          
          {/* Additional files section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Additional Files</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thumbnail upload */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Video Thumbnail</p>
                
                {imageFile ? (
                  <div className="space-y-3">
                    {!imageFile.isValid ? (
                      <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-md text-red-600 dark:text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        {imageFile.errorMessage}
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                        <img 
                          src={imageFile.preview} 
                          alt="Thumbnail preview" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleRemoveFile('image')}
                          className="absolute top-2 right-2 p-1 rounded-full bg-gray-800/70 text-white hover:bg-gray-800"
                          aria-label="Remove image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                      <div className="flex items-center">
                        <div className="p-1.5 rounded-md bg-primary/10 dark:bg-primary/20 mr-2">
                          <ImageIcon size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{imageFile.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{imageFile.size}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFile('image')}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => imageInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4 text-center cursor-pointer hover:border-primary dark:hover:border-primary transition-colors"
                  >
                    <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-2">
                      <ImageIcon size={18} className="text-primary" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      JPG, PNG or GIF
                    </p>
                    <button className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      Browse Files
                    </button>
                  </div>
                )}
                
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageChange}
                  accept=".jpg,.jpeg,.png,.gif"
                  className="hidden"
                />
              </div>
              
              {/* Subtitle upload */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Subtitle File</p>
                
                {subtitleFile ? (
                  <div className="space-y-3">
                    {!subtitleFile.isValid ? (
                      <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-md text-red-600 dark:text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        {subtitleFile.errorMessage}
                      </div>
                    ) : (
                      <div className="h-[104px] flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Subtitle file selected
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                      <div className="flex items-center">
                        <div className="p-1.5 rounded-md bg-primary/10 dark:bg-primary/20 mr-2">
                          <FileText size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{subtitleFile.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitleFile.size}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFile('subtitle')}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => subtitleInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4 text-center cursor-pointer hover:border-primary dark:hover:border-primary transition-colors"
                  >
                    <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-2">
                      <FileText size={18} className="text-primary" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      SRT or VTT subtitle files
                    </p>
                    <button className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      Browse Files
                    </button>
                  </div>
                )}
                
                <input
                  type="file"
                  ref={subtitleInputRef}
                  onChange={handleSubtitleChange}
                  accept=".srt,.vtt"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Upload status section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upload Status</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Video File</p>
                <div className={`flex items-center p-3 rounded-md ${
                  videoFile && videoFile.isValid
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {videoFile && videoFile.isValid ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="text-sm">Ready to upload</span>
                    </>
                  ) : (
                    <span className="text-sm">No file selected</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Thumbnail</p>
                <div className={`flex items-center p-3 rounded-md ${
                  imageFile && imageFile.isValid
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {imageFile && imageFile.isValid ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="text-sm">Ready to upload</span>
                    </>
                  ) : (
                    <span className="text-sm">Optional</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Subtitle File</p>
                <div className={`flex items-center p-3 rounded-md ${
                  subtitleFile && subtitleFile.isValid
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {subtitleFile && subtitleFile.isValid ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="text-sm">Ready to upload</span>
                    </>
                  ) : (
                    <span className="text-sm">Optional</span>
                  )}
                </div>
              </div>
              
              {uploadSuccess && (
                <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-md text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>Upload successful!</span>
                </div>
              )}
              
              <button
                onClick={handleUpload}
                disabled={!videoFile || !videoFile.isValid || isUploading}
                className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${
                  !videoFile || !videoFile.isValid || isUploading
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                } transition-colors`}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Upload
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upload Guidelines</h2>
            
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                <span>Maximum video file size: 2GB</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                <span>Supported video formats: MP4, AVI, MOV, WEBM</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                <span>Recommended resolution: 1920x1080 (HD)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                <span>Aspect ratio: 16:9</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                <span>Thumbnail images: JPG, PNG or GIF</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                <span>Subtitle files: SRT or VTT format</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;