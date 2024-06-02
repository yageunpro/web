import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./Input.module.scss";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={styles.wrapper} {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={styles.wrapper} {...props} />;
}
