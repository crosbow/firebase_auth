import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "feedbacks"));

    const fetchedFeedbacks = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for a document snapshot
      // You often want the document ID along with its data
      const data = doc.data();
      if (data.timestamp && typeof data.timestamp.toDate === "function") {
        data.timestamp = data.timestamp.toDate(); // Convert Firestore Timestamp to JS Date
      }
      fetchedFeedbacks.push({ id: doc.id, ...data });
    });

    return fetchedFeedbacks;
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

const Feedbacks = () => {
  const {
    data: feedbacks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchData,
  });

  if (isLoading) return <h2>Fetching feedbacks...</h2>;
  if (error) return <h2> {error.message} </h2>;

  return (
    <>
      <h2 className="mt-5 text-3xl font-semibold">Feedbacks</h2>
      <ol type="1" className="list-decimal p-5 text-lg">
        {feedbacks.map((feedback) => (
          <li key={feedback.id}> {feedback.feedback} </li>
        ))}
      </ol>
    </>
  );
};
export default Feedbacks;
