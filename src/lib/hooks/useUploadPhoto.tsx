import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'src/firebase/firebase-config';


const useUploadPhoto = () => {
  const uploadPhoto = async (photo:File, path: string) => {
    if (!photo) return null;

    const photoRef = ref(storage, path);

    await uploadBytes(photoRef, photo);
    return await getDownloadURL(photoRef);
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