import { useState } from "react";

const useUserIdCheck = () => {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [error, setError] = useState(null);

  const checkUserIdDuplicate = async (userid) => {
    try {
      const response = await fetch("/api/checkUserIdDuplicate", {
        method: "POST",
        body: JSON.stringify({ userid }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        // User ID is not duplicated
        setIsDuplicate(false);
        console.log("사용가능한 아이디입니다.");
        alert(data);
      } else {
        // User ID is duplicated
        setIsDuplicate(true);
        console.log("사용 불가능한 아이디입니다.");
        alert(data);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setIsDuplicate(false); // Assume user ID is not duplicated
      setError(error);
    }
  };

  return { isDuplicate, setIsDuplicate, checkUserIdDuplicate };
};

export default useUserIdCheck;
