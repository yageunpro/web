import { Button } from "./ui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function Copy({ url }: { url: string }) {
  return (
    <CopyToClipboard text={url}>
      <Button variant="secondary">{url}</Button>
    </CopyToClipboard>
  );
}
