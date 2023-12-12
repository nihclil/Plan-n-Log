"use client";

import PlanForm from "components/PlanForm";
import useAuthRedirect from "hooks/useAuthRedirect";

export default function Home() {
  useAuthRedirect();
  return <PlanForm />;
}
