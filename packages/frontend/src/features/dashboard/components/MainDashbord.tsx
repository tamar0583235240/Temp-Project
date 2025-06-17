import { Provider } from "react-redux"
import { store } from "../../../shared/store/store"
import { ImprovementSuggestions } from "./ImprovementSuggestions"

export const MainDashbord=()=>{
    return<>
    <Provider store={store}>
        <ImprovementSuggestions></ImprovementSuggestions>
    </Provider>
    </>
}