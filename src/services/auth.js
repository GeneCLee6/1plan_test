import 'plugins/firebase';
import {
	getAuth,
	setPersistence,
	signInWithEmailAndPassword,
	browserLocalPersistence,
	signOut,
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';

export const auth = getAuth();

export const signUp = async (email, password) => {
	return await createUserWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			const user = userCredential.user;
			// TODO: continue url needs to be changed to the actual url in production
			const actionCodeSettings = {
				url: `https://plan-au.web.app/home/dashboard`,
			};
			await sendEmailVerification(user, actionCodeSettings);
			return {
				data: user,
				status: true,
			};
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			return {
				data: { errorCode, errorMessage },
				status: false,
			};
		});
};

export const login = async (email, password) => {
	return await setPersistence(auth, browserLocalPersistence)
		.then(async () => {
			return await signInWithEmailAndPassword(auth, email, password).then(
				(userCredential) => {
					const user = userCredential.user;
					return {
						data: user,
						status: true,
					};
				},
			);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			return {
				data: { errorCode, errorMessage },
				status: false,
			};
		});
};

export const logout = async () => {
	return await signOut(auth);
};
