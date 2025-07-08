import { FeedbackToSystem } from "../types/FeedbackToSystem";

export const UpdateFeedbackToSystem = (props: { feedback: FeedbackToSystem, onClose: Function }) => {
    const { feedback, onClose } = props;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 relative">
                <button
                    className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 text-xl"
                    onClick={() => onClose()}
                >
                    ✕
                </button>
                <h3 className="text-2xl font-semibold mb-4 text-center">עידכון פידבק</h3>
                <form>
                    <div>
                        <label>ID:</label>
                        {/* <label>Content:</label>
                    <input type="text" value={feedback.content} /> */}
                    </div>
                    <button type="button" onClick={() => onClose()}>
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
}