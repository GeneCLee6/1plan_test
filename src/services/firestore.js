import { firebase } from 'plugins/firebase';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
  arrayRemove,
  deleteField,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const getPlans = async () => {
  const querySnapshot = await getDocs(collection(db, 'plans'));
  return await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const planSectionsDoc = await getDoc(doc.data().planSectionsRef);
      return {
        _id: doc.id,
        ...doc.data(),
        sections: {
          _id: planSectionsDoc.id,
          ...planSectionsDoc.data(),
        },
      };
    })
  );
};
export const getPlanAllPlanSections = async (planRef) => {
  const planDoc = await getDocByRef(planRef);
  const sections = await Promise.all(
    planDoc.planSectionRefs.map(async (r, i) => await getDocByRef(r))
  );
  return sections;
};
export const getDocByRef = async (docRef) => {
  const doc = await getDoc(docRef);
  if (doc.exists()) {
    return {
      _id: doc.id,
      ...doc.data(),
    };
  }
};
export const getPlanSection = async (docId) => {
  const docRef = doc(db, 'planSections', docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      _id: docSnap.id,
      ...docSnap.data(),
    };
  }
};

export const getCompany = async (docId) => {
  const docRef = doc(db, 'companies', docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      _id: docSnap.id,
      ...docSnap.data(),
    };
  }
};

export const getUser = async (docId) => {
  const docRef = doc(db, 'users', docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const { companyRef, companyRefs } = docSnap.data();
    const companyDoc = await getDoc(companyRef);

    const companies = await Promise.all(
      companyRefs.map(async (ref) => {
        const companyDoc = await getDoc(ref);
        return {
          _id: companyDoc.id,
          ...companyDoc.data(),
        };
      })
    );
    return {
      _id: docSnap.id,
      ...docSnap.data(),
      company: {
        _id: companyDoc.id,
        ...companyDoc.data(),
      },
      companies,
    };
  }
};

export const setData = async (collectionName, data, docId) => {
  const ref = doc(db, collectionName, docId);
  try {
    const res = await setDoc(ref, data, { merge: true });
    return { status: true, docId: res.id };
  } catch (error) {
    return { status: false, error };
  }
};

export const addData = async (collectionName, data) => {
  const ref = collection(db, collectionName);
  try {
    const res = await addDoc(ref, data);
    const docId = res.id;
    return { status: true, docId };
  } catch (error) {
    return { status: false, error };
  }
};
export const updateData = async (collection, docId, data) => {
  const ref = doc(db, collection, docId);
  try {
    const res = await updateDoc(ref, data);
    return { status: true };
  } catch (error) {
    return {
      status: false,
      error,
    };
  }
};
export const updateArrayData = async (collection, docId, path, element) => {
  const ref = doc(db, collection, docId);
  try {
    const res = await updateDoc(ref, {
      [path]: arrayUnion(element),
    });
    return { status: true };
  } catch (error) {
    return {
      status: false,
      error,
    };
  }
};

export const deleteData = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return { status: true };
  } catch (error) {
    return { status: false };
  }
};

export const deleteDataField = async (collectionName, docId, path) => {
  const ref = doc(db, collectionName, docId);
  try {
    const res = await updateDoc(ref, {
      [path]: deleteField(),
    });
    return { status: true };
  } catch (error) {
    return {
      status: false,
      error,
    };
  }
};

export const createDocReference = (referencePath) => doc(db, referencePath);
