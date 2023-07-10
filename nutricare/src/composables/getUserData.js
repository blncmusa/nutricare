import { ref } from "vue";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

const fetchUserData = async () => {
  try {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        gender: userData.gender,
        weight: userData.weight,
        height: userData.height,
        goal: userData.goal,
      };
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const useUser = () => {
  const user = ref(null);

  const getUserData = async () => {
    user.value = await fetchUserData();
  };

  return {
    user,
    getUserData,
  };
};

export default useUser;
