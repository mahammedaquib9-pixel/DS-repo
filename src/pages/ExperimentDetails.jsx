import { useParams, Navigate } from "react-router-dom";
import ExperimentOverview from "./ExperimentOverview";

export default function ExperimentDetails() {
  const { experimentId } = useParams();
  return <Navigate to={`/experiments/${experimentId}/overview`} replace />;
}
