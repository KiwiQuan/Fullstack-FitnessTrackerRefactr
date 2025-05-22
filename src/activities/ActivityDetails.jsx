import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function ActivityDetails() {
  const navigate = useNavigate();
  const { activityId } = useParams();
  const { data: activity } = useQuery("/activities/" + activityId, "activity");

  const { token } = useAuth();
  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation("DELETE", "/activities/" + activityId, ["activities"]);
  return (
    <div>
      <button onClick={() => navigate("/activities")}>Back</button>
      <h2>{activity?.name}</h2>
      <p>by {activity?.creatorName}</p>
      <p>{activity?.description}</p>
      {token && (
        <button
          onClick={() => {
            deleteActivity();
          }}
        >
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
    </div>
  );
}
