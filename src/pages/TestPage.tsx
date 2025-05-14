
import { useParams } from "react-router-dom";
const TestPage = () => {
  const { setId } = useParams<{setId?: string;}>();
  return (
    <div className="container mx-auto max-w-2xl flex flex-col items-center justify-center min-h-screen">
      <div className="bg-learnzy-purple/10 p-8 rounded-lg text-center mt-20">
        <h1 className="text-3xl font-bold mb-3">Test Placeholder</h1>
        <p>This is where Set {setId} will start. (Questions, metrics, and timers would be here.)</p>
      </div>
    </div>
  );
};
export default TestPage;
