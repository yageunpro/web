import { useSyncExternalStore } from "react";

const getCurrentHash = () => window.location.hash.replace(/^#/, "");

const subscribe = (callback: () => void) => {
  const onHashChange = () => {
    callback();
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
