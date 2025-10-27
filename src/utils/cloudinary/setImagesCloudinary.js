import axios from "axios";
/**
 * Upload one or more files to Cloudinary (unsigned preset)
 * @param {FileList|File[]} files - selected files
 * @param {Object} options - { onProgress: (fileIndex, percent) => void, cloudName, uploadPreset}
 * @returns {Promise<string[]>} urls array uploaded ( corresponds sort to files)
 */

export async function setImagesInCloudinary(files, options = {}) {
  if (!files || files.length === 0) return [];

  try {
    const {
      onProgress = () => {},
      cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    } = options;

    if ((!cloudName, !uploadPreset)) {
      throw new Error("Cloudinary cloud name or upload preset not configured");
    }
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const fileArray = Array.from(files);

    const promises = fileArray.map(async (file, idx) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", uploadPreset);

      const res = await axios.post(uploadUrl, data, {
        onUploadProgress: (evt) => {
          if (evt.total) {
            const percent = Math.round((evt.loaded * 100) / evt.total);
            onProgress(idx, percent);
          }
        },
      });

      return res.data;
    });

    const results = await Promise.all(promises);
    return results.map((r) => r.secure_url || r.url);
  } catch (error) {
    // console.log("An error has ocurred when images were uploading: ", error);
    throw error;
  }
}
