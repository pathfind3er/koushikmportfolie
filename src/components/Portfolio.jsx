import React, { useEffect, useState } from "react";
import Layout from "/src/components/layout/Layout.jsx";
import { useData } from "/src/providers/DataProvider.jsx";
import { useLanguage } from "/src/providers/LanguageProvider.jsx";
import { useLocation } from "/src/providers/LocationProvider.jsx";
import { useNavigation } from "/src/providers/NavigationProvider.jsx";
import LayoutNavigation from "/src/components/layout/LayoutNavigation.jsx";
import LayoutImageCache from "/src/components/layout/LayoutImageCache.jsx";
import LayoutSlideshow from "/src/components/layout/LayoutSlideshow.jsx";

function Portfolio() {
  const [blackScreen, setBlackScreen] = useState(false);

  const data = useData();
  const language = useLanguage();
  const location = useLocation();
  const navigation = useNavigation();

  if (!data || !language || !location || !navigation) {
    window.location.reload();
    return;
  }

  const profile = data.getProfile();
  const settings = data.getSettings();
  const sections = data.getSections();

  const backgroundStyle = settings.templateSettings.backgroundStyle;

  const currentSection = navigation.targetSection;
  const previousSection = navigation.previousSection;
  const sectionLinks = navigation.sectionLinks;
  const categoryLinks = navigation.categoryLinks;

  useEffect(() => {
    if (window.location.hash === "#portfolio" || window.location.hash === "#updates") {
      setBlackScreen(true);
      sessionStorage.setItem("blockedSection", "true");
    }
  }, [window.location.hash]);

  useEffect(() => {
    if (sessionStorage.getItem("blockedSection") === "true") {
      window.location.hash = "#about";
      sessionStorage.removeItem("blockedSection");
    }
  }, []);

  return (
    <>
      {blackScreen && (
        <div
          style={{
            backgroundColor: "black",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
          }}
        >
          {/* optional: you can add a message like “Access Denied” */}
        </div>
      )}
      <Layout id={"react-portfolio"} backgroundStyle={backgroundStyle}>
        <LayoutImageCache profile={profile} settings={settings} sections={sections} />

        <LayoutNavigation profile={profile} sectionLinks={sectionLinks} categoryLinks={categoryLinks}>
          <LayoutSlideshow sections={sections} currentSection={currentSection} previousSection={previousSection} />
        </LayoutNavigation>
      </Layout>
    </>
  );
}

export default Portfolio;
