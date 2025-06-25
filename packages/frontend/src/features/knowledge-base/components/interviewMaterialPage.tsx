import { Provider } from "react-redux"
import { store } from "../store/store"
import InterviewMaterialList from "./interviewMaterialList"

const InterviewMaterialPage = () => {


    return(<>
    <Provider store={store}>
    <InterviewMaterialList/>
    </Provider>
    </>)
}
export default InterviewMaterialPage
