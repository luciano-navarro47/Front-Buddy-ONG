import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPetDetails } from "redux/actions/petActions";

export function usePetForm(paramsId, initialValues, setInput, isUpdating) {
  const dispatch = useDispatch();
  const petData = useSelector((s) => s.pets.petDetails);

  useEffect(() => {
    if (paramsId) dispatch(getPetDetails(paramsId));
  }, [dispatch, paramsId]);

  useEffect(() => {
    setInput(
      isUpdating === true ? { ...initialValues, ...petData } : initialValues
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petData, paramsId, isUpdating, setInput]);

  return petData;
}
