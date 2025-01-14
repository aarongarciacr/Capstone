import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import {
  fetchDeleteExercise,
  fetchGetAllExercises,
} from "../../store/exercise";
import "./DeleteExerciseModal.css";

const DeleteExerciseModal = ({ exerciseId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(fetchDeleteExercise(exerciseId));
    await dispatch(fetchGetAllExercises());
    closeModal();
  };

  return (
    <div className="delete-modal-container">
      <h1 className="h1-delete-spot-modal">Confirm Delete</h1>
      <h2 className="h2-delete-spot-modal">
        Are you sure you want to remove this exercise from the listings?
      </h2>
      <div className="buttons-container">
        <div className="delete-buttons">
          <button
            onClick={handleDelete}
            className="delete-button"
            type="button"
          >
            Yes (Delete Exercise)
          </button>
          <button onClick={closeModal} className="delete-button" type="button">
            No (Keep Exercise)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExerciseModal;
