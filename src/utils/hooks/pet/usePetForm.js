import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPetDetails } from "redux/Actions/petActions";

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
  }, [petData, paramsId, isUpdating, setInput]);

  return petData;
}
