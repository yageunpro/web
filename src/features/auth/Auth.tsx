import { buttonVariants } from "@/components/ui/button";
import Title from "../../components/Title";
import styles from "./Auth.module.scss";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export function Auth() {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/user/me").then((response) => {
      if (response.status === 200) {
        if (ref) {
          navigate(ref, {
            replace: true,
          });
        }
        navigate("/", {
          replace: true,
        });
      }
    });
  }, [navigate, ref]);

  return (
    <div className={styles.wrapper}>
      <Title>로그인/회원가입</Title>
      <ul className={styles.authList}>
        <li>
          <a
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),
              "w-full"
            )}
            href={`/api/auth/oauth/google?ref=${ref}`}
          >
            Google로 로그인
          </a>
        </li>
      </ul>
    </div>
  );
}
