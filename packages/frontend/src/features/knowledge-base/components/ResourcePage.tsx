import { Provider } from "react-redux"
import ResourceList from "./ResourcesList"
import { store } from "../store/store"

const ResourcePage = () => {


    return(<>
    <Provider store={store}>
    <ResourceList/>
    </Provider>
    </>)
}
export default ResourcePage
