import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkUserPassword } from "redux/Actions/userActions";
import TextField from "./TextField";

export default function PasswordSection({
  form,
  setForm,
  debounceRef,
  onPasswordValidationChange,
  userId,
  resetTrigger,
}) {
  const dispatch = useDispatch();
  const [isSamePassword, setIsSamePassword] = useState(false);
  const [isCurrentValid, setIsCurrentValid] = useState(null);
  const [checking, setChecking] = useState(false);
  const [showActualPass, setShowActualPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const validateCurrentPassword = async (password) => {
    if (!password) {
      setIsCurrentValid(null);
      return;
    }
    setChecking(true);
    try {
      const isCorrect = await dispatch(checkUserPassword(userId, password));

      setIsCurrentValid(isCorrect);
    } catch (error) {
      setIsCurrentValid(false);
    } finally {
      setChecking(false);
    }
  };

  const handleCurrentChange = (e) => {
    const password = e.target.value;
    setForm((form) => ({ ...form, currentPassword: password }));

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      validateCurrentPassword(password);
    }, 500);
  };

  useEffect(() => {
    const same = form.currentPassword === form.newPassword;
    const valid = isCurrentValid === true;

    if (!form.currentPassword || !form.newPassword) {
      setIsSamePassword(false);
      onPasswordValidationChange(null, false);
      return;
    }
    setIsSamePassword(same);
    onPasswordValidationChange(valid, same);
  }, [form.currentPassword, form.newPassword, isCurrentValid]);

  useEffect(() => {
    setIsCurrentValid(null);
    setIsSamePassword(false);
  }, [resetTrigger]);

  return (
    <>
      <TextField
        label="Contraseña actual"
        name="currentPassword"
        value={form.currentPassword}
        onChange={handleCurrentChange}
        type="password"
        isPassword
        showPassword={showActualPass}
        toggleShowPassword={() => setShowActualPass((v) => !v)}
        checking={checking}
        isValid={isCurrentValid}
        helpText="Ingresá tu contraseña actual para poder cambiarla"
      />

      <TextField
        label="Nueva contraseña"
        name="newPassword"
        value={form.newPassword}
        onChange={(e) =>
          setForm((form) => ({ ...form, newPassword: e.target.value }))
        }
        isPassword
        showPassword={showNewPass}
        toggleShowPassword={() => setShowNewPass((v) => !v)}
        disabled={!isCurrentValid}
        error={
          isSamePassword
            ? "La nueva contraseña debe ser distinta de la actual"
            : null
        }
      />
    </>
  );
}
