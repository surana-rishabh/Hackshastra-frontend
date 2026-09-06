import { useState, useCallback } from 'react';
import { RegistrationDeckConfig } from '@/data/registration/beyondTheScreen';

export interface RegistrationFormData {
  fullName: string;
  studentId: string;
  gender: string;
  email: string;
  contactNumber: string;
  department: string;
  year: string;
  favouritePokemon: string;
  participationInterest: string;
}

export interface FormValidationErrors {
  [key: string]: string | undefined;
}

const INITIAL_FORM_DATA: RegistrationFormData = {
  fullName: '',
  studentId: '',
  gender: '',
  email: '',
  contactNumber: '',
  department: '',
  year: '',
  favouritePokemon: '', // Empty until revealed by trainer
  participationInterest: 'yes', // Default to active participant
};

export function useRegistrationForm(initialValues: Partial<RegistrationFormData> = {}) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    ...INITIAL_FORM_DATA,
    ...initialValues,
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setFieldValue = useCallback((field: keyof RegistrationFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error on edit
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  const setFieldTouched = useCallback((field: keyof RegistrationFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validateField = useCallback((field: keyof RegistrationFormData, value: string): string | null => {
    const val = (value || '').trim();

    switch (field) {
      case 'fullName':
        if (!val) return 'Trainer name is required';
        if (val.length < 2) return 'Name must be at least 2 characters';
        return null;

      case 'studentId':
        if (!val) return 'Trainer ID / Registration number is required';
        if (val.length < 4) return 'Please enter a valid Registration ID (e.g. AP24110010001)';
        return null;

      case 'gender':
        if (!val) return 'Please select your gender';
        return null;

      case 'email': {
        if (!val) return 'Email address is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) return 'Please enter a valid email address';
        if (!val.toLowerCase().endsWith('@srmap.edu.in')) {
          return 'Registration is exclusive to SRM University-AP students (@srmap.edu.in)';
        }
        return null;
      }

      case 'contactNumber': {
        if (!val) return 'Contact number is required';
        // Accepts 10 digits or with +91/0 prefix and optional hyphens/spaces
        const digitsOnly = val.replace(/\D/g, '');
        if (digitsOnly.length < 10) return 'Please enter a valid 10-digit mobile number';
        return null;
      }

      case 'department':
        if (!val) return 'Please select your department';
        return null;

      case 'year':
        if (!val) return 'Please select your year of study';
        return null;

      case 'favouritePokemon':
        if (!val) return 'Please choose your partner Pokémon';
        return null;

      case 'participationInterest':
        if (!val) return 'Please select your battle readiness choice';
        return null;

      default:
        return null;
    }
  }, []);

  const validateCard = useCallback(
    (cardIndex: number, config: RegistrationDeckConfig): boolean => {
      const card = config.cards[cardIndex];
      if (!card || !card.fields || card.fields.length === 0) {
        return true; // Card with no fields (e.g. Card 05 review card)
      }

      const cardErrors: FormValidationErrors = {};
      let isValid = true;

      for (const field of card.fields) {
        const fieldName = field.name as keyof RegistrationFormData;
        const fieldValue = formData[fieldName] || '';
        const error = validateField(fieldName, fieldValue);

        if (error) {
          cardErrors[fieldName] = error;
          isValid = false;
        }
      }

      setErrors((prev) => ({
        ...prev,
        ...cardErrors,
      }));

      // Mark these fields as touched so UI highlights errors
      setTouched((prev) => {
        const next = { ...prev };
        for (const field of card.fields) {
          next[field.name] = true;
        }
        return next;
      });

      return isValid;
    },
    [formData, validateField]
  );

  const validateAll = useCallback(
    (config: RegistrationDeckConfig): boolean => {
      const allErrors: FormValidationErrors = {};
      let isValid = true;

      for (const card of config.cards) {
        for (const field of card.fields) {
          const fieldName = field.name as keyof RegistrationFormData;
          const fieldValue = formData[fieldName] || '';
          const error = validateField(fieldName, fieldValue);
          if (error) {
            allErrors[fieldName] = error;
            isValid = false;
          }
        }
      }

      setErrors(allErrors);
      return isValid;
    },
    [formData, validateField]
  );

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setTouched({});
  }, []);

  return {
    formData,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    validateField,
    validateCard,
    validateAll,
    resetForm,
    setErrors,
  };
}
