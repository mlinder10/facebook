import mondaySdk from "monday-sdk-js";
import { useEffect, useState } from "react";

const monday = mondaySdk();

export default function useMonday() {
  const [url, setUrl] = useState("");
  const [isViewer, setViewer] = useState(true);
  const [theme, setTheme] = useState("light");
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(600);

  useEffect(() => {
    monday.execute("valueCreatedForUser");
    monday.listen("context", (res) => {
      setTheme(res.data.theme);
      setViewer(res.data.user.isViewOnly);
    });

    monday.listen("settings", (res) => {
      setUrl(res.data.url);
      setWidth(parseInt(res.data.width));
      setHeight(parseInt(res.data.height));
    });
  }, []);

  return { url, width, height, theme, isViewer };
}
