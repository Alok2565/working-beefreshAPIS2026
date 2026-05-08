import { useEffect } from "react";

function usePageTitle(title: string) {
  const siteName = "Bee Fresh Honey, Purity zero moisture";

  useEffect(() => {
    document.title = `${title} | ${siteName}`;
  }, [title]);
}

export default usePageTitle;