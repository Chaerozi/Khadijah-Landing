import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Zustand store untuk menyimpan data registrasi
 * Persist ke localStorage agar data tidak hilang saat refresh
 * Hanya menyimpan text fields, tidak menyimpan file uploads
 */
export const useRegistrationStore = create(
  persist(
    (set) => ({
      // Registration form data (text only)
      registrationData: {
        parentName: "",
        email: "",
        childName: "",
        whatsapp: "",
        birthDate: "",
        level: "",
        address: "",
      },

      // Registration response dari backend
      registrationId: null,
      productInfo: null,

      // Set registration form data
      setRegistrationData: (data) => set({ registrationData: data }),

      // Set registration response (ID + product info)
      setRegistrationResponse: (id, productInfo) =>
        set({ registrationId: id, productInfo }),

      // Clear all registration data (after payment success)
      clearRegistration: () =>
        set({
          registrationData: {
            parentName: "",
            email: "",
            childName: "",
            whatsapp: "",
            birthDate: "",
            level: "",
            address: "",
          },
          registrationId: null,
          productInfo: null,
        }),
    }),
    {
      name: "khadijah-registration", // localStorage key
      // Only persist registration data, not files
      partialize: (state) => ({
        registrationData: state.registrationData,
        registrationId: state.registrationId,
        productInfo: state.productInfo,
      }),
    },
  ),
);
