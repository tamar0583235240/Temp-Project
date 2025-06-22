import InterviewComponent from "../features/interview/components/buttonsComponent"
import Simulation from "../features/interview/components/Simulation"
import { TipsComponent } from "../features/interview/components/tipsCompenent"

const InterviewPage= () => {
  return (
    <div>
     <TipsComponent/>
     <InterviewComponent/>
     <Simulation/>
    </div>
  )
}

export default InterviewPage