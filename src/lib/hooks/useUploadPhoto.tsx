import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'src/firebase/firebase-config';


const useUploadPhoto = () => {
  const uploadPhoto = async (photo:File, parentPath:string) => {
    if (!photo) return null;

    const uniquePhotoName = `${photo.name}}`;
    const fullPath = `${parentPath}/${uniquePhotoName}`;
    const photoRef = ref(storage, fullPath);

    await uploadBytes(photoRef, photo);
    return fullPath;
  };

  const getPhotoURL = async (path:string) => {
    const photoRef = ref(storage, path);
    try {
      return await getDownloadURL(photoRef);
    } catch (error) {
      console.error('Error fetching photo:', error);
      return null;
    }
  };

  return { uploadPhoto, getPhotoURL };
};

export default useUploadPhoto;