import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  if (!deferredPrompt) return null;

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={installApp}
      sx={{ borderRadius: 50 }}
    >
      Install App
    </Button>
  );
}
