import { useEffect, useState, useRef } from "react";
import { updateUser, getUserById } from "redux/Actions/userActions";
import { validateRequiredFields, validateFieldPatterns } from "utils/formValidations/profileForm";
import { useDispatch, useSelector } from "react-redux";

export function useProfileForm(user, toast) {
  const dispatch = useDispatch();
  const debounceRef = useRef(null);
  const userInfo = useSelector((s) => s.user);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({});
  const requiredFields = [
    "first_name",
    "last_name",
    "username",
    "email",
    "phone",
  ];

  const [isSamePassword, setIsSamePassword] = useState(false);
  const [isCurrentValid, setIsCurrentValid] = useState(null);
  const [passwordResetTrigger, setPasswordResetTrigger] = useState(0);

  const handlePasswordValidationChange = (isValid, isSame) => {
    setIsCurrentValid(isValid);
    setIsSamePassword(isSame);
  };

  const requiresPasswordChange = form.newPassword.length > 0;
  const canSave = !requiresPasswordChange
    ? true
    : isCurrentValid === true && !isSamePassword;

  const isFormValid = Object.keys(errors).length === 0;
  const canSaveFinal = isFormValid && canSave;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    setForm(updatedForm);

    const validationErrors = validateRequiredFields(
      updatedForm,
      requiredFields
    );
    const patternErrors = validateFieldPatterns(updatedForm);

    setErrors({ ...validationErrors, ...patternErrors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      username: form.username,
      email: form.email,
      phone: form.phone,
      newPassword: form.newPassword,
    };

    if (form.newPassword) {
      payload.password = form.newPassword;
      payload.currentPassword = form.currentPassword;
    }

    if (!payload.password) {
      delete payload.password;
    }

    dispatch(updateUser(userInfo.id, payload));
    toast({ status: "success", title: "Perfil actualizado" });
    setForm((form) => ({ ...form, currentPassword: "", newPassword: "" }));
    setIsCurrentValid(null);
    setPasswordResetTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    if (user?.id) dispatch(getUserById(user.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (userInfo.id) {
      setForm({
        first_name: userInfo.first_name ?? "",
        last_name: userInfo.last_name ?? "",
        username: userInfo.username ?? "",
        email: userInfo.email ?? "",
        phone: userInfo.phone ?? "",
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [userInfo]);

  return {
    userInfo,
    form,
    errors,
    canSaveFinal,
    passwordResetTrigger,
    debounceRef,
    setForm,
    handleChange,
    handleSubmit,
    handlePasswordValidationChange,
  }
}
