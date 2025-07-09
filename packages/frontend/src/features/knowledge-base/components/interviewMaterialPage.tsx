import { useState } from "react";
import { CreateInterviewMaterialsSubForm } from "./CreateInterviewMaterialsSubForm";
import MessageModal from "../../../shared/ui/messageModal";
import { Button } from "../../../shared/ui/button";
import { Plus } from "lucide-react"; 
import { useCreateInterviewMaterialSubMutation } from "../../../shared/api/interviewMaterialApi";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { InterviewMaterialsList } from "./InterviewMaterialsList";

const InterviewMaterialPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createResource, { isLoading, isSuccess, isError, error }] = useCreateInterviewMaterialSubMutation();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      await createResource(formData).unwrap();
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant="primary-dark" 
        size="md"
        icon={<Plus size={18} />}
        iconPosition="left"
        className="mb-4"
      >
        הוסף פריט 
      </Button>

      {isModalOpen && (
        <MessageModal
          title="הוספת פריט"
          message={
            <CreateInterviewMaterialsSubForm
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
            />
          }
          onClose={handleCloseModal}
        />
      )}

      
      <Provider store={store}>
        <InterviewMaterialsList />
      </Provider>
     
    </>
  );
};

export default InterviewMaterialPage;

