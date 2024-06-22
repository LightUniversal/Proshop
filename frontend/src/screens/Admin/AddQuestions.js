import { useCreateQuestionMutation } from "../../slices/productApiSlice"

const AddQuestions = () => {


  const [createQuestion, { isLoading: loadingQuestions}] = useCreateQuestionMutation();

  
  return (
    <div>
      
    </div>
  )
}

export default AddQuestions
