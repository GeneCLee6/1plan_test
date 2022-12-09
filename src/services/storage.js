import { firebase } from 'plugins/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const storage = getStorage(firebase);

export const uploadFile = async (file, filePath) => {
	const fileRef = ref(storage, filePath);
	const uploadTask = await uploadBytes(fileRef, file);
	const downloadURL = await getDownloadURL(uploadTask.ref);
	return downloadURL;
};
