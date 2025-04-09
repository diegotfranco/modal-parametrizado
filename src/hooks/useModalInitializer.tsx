import { useEffect } from "react";
import { useModalStore } from "../store/useModalStore";
import modalService from "../services/modalService";

export const useModalInitializer = () => {
  // console.log('chamando useModalInitializer...');  
	const { setSteps } = useModalStore();
	const { data, isFetching, isSuccess, isError, error } = modalService();

	useEffect(() => {
		if (isSuccess && data) {
			setSteps([data]);
		}
	}, [isSuccess, data, setSteps]);

	return { isFetching, isSuccess, isError, error };
};
