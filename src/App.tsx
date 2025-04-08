import { useModalStore } from "./store/useModalStore";
import ModalContainer from "./components/ModalContainer";
import { useModalInitializer } from "./hooks/useModalInitializer";

const App = () => {
	const { openModal } = useModalStore();
	const { isFetching, isSuccess, isError } = useModalInitializer();

	const handleOpenModal = () => {
		if (!isFetching && isSuccess) {
			openModal();
		}
	};

	return (
		<div className="h-screen">
			<div>
				<h1>Pedido de Restituição</h1>
				<h2 className="text-gray-400">|</h2>
				<h2 className="text-gray-400">Home / Pedido de Restituição</h2>
				<h3>Clique no botão abaixo para abrir a modal parametrizada</h3>

				<button
					onClick={handleOpenModal}
					disabled={isFetching}
					className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded disabled:opacity-50"
				>
					{isFetching ? "Carregando..." : "Abrir Modal"}
				</button>

				{isError && (
					<p className="text-red-600 mt-2">
						Erro ao carregar os dados da modal. Tente novamente mais tarde.
					</p>
				)}

				<ModalContainer />
			</div>
		</div>
	);
};

export default App;
