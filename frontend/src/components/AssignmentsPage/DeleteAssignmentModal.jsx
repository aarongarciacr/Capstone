import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./DeleteAssignmentModal.css";
import {
  fetchDeleteAssignment,
  fetchGetAssignments,
  fetchGetStudentAssignments,
} from "../../store/assignment";

const DeleteAssignmentModal = ({ assignmentId, studentId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(fetchDeleteAssignment(assignmentId));
      await dispatch(fetchGetAssignments());
      await dispatch(fetchGetStudentAssignments(studentId));
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="delete-modal-container">
      <h1 className="h1-delete-spot-modal">Confirm Delete</h1>
      <h2 className="h2-delete-spot-modal">
        Are you sure you want to remove this assignment from the listings?
      </h2>
      <div className="buttons-container">
        <div className="delete-buttons">
          <button
            onClick={handleDelete}
            className="delete-button"
            type="button"
          >
            Yes (Delete Assignment)
          </button>
          <button onClick={closeModal} className="delete-button" type="button">
            No (Keep Assignment)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAssignmentModal;
