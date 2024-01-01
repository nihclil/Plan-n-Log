import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "hooks/authContext";

export default function useAuthRedirect() {
  const router = useRouter();
  const { user, loading } = UserAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);
}
