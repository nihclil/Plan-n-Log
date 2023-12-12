import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "hooks/authContext";

export default function useAuthRedirect() {
  const router = useRouter();
  const { user } = UserAuth();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);
}
