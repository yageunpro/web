import { useSyncExternalStore } from "react";

const getCurrentHash = () => window.location.hash.replace(/^#/, "");

const subscribe = () => {
  const onHashChange = () => {
    const hash = getCurrentHash();
    console.log("hash", hash);
  };

  window.addEventListener("hashchange", onHashChange);
  onHashChange();

  return () => {
    window.removeEventListener("hashchange", onHashChange);
  };
};

export default function useHashRouter() {
  return useSyncExternalStore(subscribe, getCurrentHash);
}
