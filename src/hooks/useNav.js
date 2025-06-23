// import { useState, useEffect } from "react";
// import { fetchMDName, updatePhoneNumber } from "../services/navService";
// import { useAuth } from "../context/authContext";

// export const useNav = () => {
//   const { token, user } = useAuth();
//   const [mdName, setMdName] = useState(user?.name || "");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadMD = async () => {
//       try {
//         const response = await fetchMDName(token);
//         setMdName(response.data.name);
//       } catch (err) {
//         console.error("Failed to fetch MD name", err);
//       }
//     };

//     if (!user?.name) {
//       loadMD();
//     }
//   }, [token, user?.name]);

//   const updatePhone = async (phoneNumber) => {
//     setLoading(true);
//     try {
//       const res = await updatePhoneNumber(phoneNumber, token);
//       return { success: true, message: res.data.message };
//     } catch (err) {
//       return {
//         success: false,
//         message: err?.response?.data?.message || "Failed to update",
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { mdName, loading, updatePhone };
// };

import { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useNav = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);

  const mdName = user?.name || "";

  const updatePhone = async (phone, name) => {
    if (!user?.id || !token) return;

    const payload = {
      name: name?.trim() || "",
      phone_number: phone?.length === 10 ? "91" + phone : "",
    };

    // Prevent sending both fields empty
    if (!payload.name && !payload.phone_number) {
      return { success: false, message: "No data to update" };
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${API_URL}md/update-phone`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        const nameUpdated = !!name?.trim();
        const phoneUpdated = phone?.length === 10;

        let message = "";
        if (nameUpdated && phoneUpdated) message = "Name & Phone updated successfully";
        else if (nameUpdated) message = "Name updated successfully";
        else message = "Phone number updated successfully";

        return { success: true, message };
      }

      return { success: false, message: "Update failed" };
    } catch (err) {
      return {
        success: false,
        message:
          err?.response?.data?.message || "Something went wrong while updating",
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    mdName,
    updatePhone,
    loading,
  };
};

export default useNav;

