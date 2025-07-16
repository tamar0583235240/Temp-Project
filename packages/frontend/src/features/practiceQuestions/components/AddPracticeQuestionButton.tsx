import React, { useState } from 'react';
import { Button } from '../../../shared/ui/button';
import AddNewPracticeQuestion from './AddNewPracticeQuestion';
import { FaPlus } from 'react-icons/fa';

const AddPracticeQuestionButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        variant="primary-dark"
        size="md"
        onClick={handleOpenModal}
        icon={<FaPlus />}
        iconPosition="left"
      >
        הוספת שאלה מקצועית
      </Button>

      <AddNewPracticeQuestion
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default AddPracticeQuestionButton;
