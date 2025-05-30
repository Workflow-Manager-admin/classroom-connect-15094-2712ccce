import React, { useState } from "react";

// Colors and theme (could be migrated to a CSS/SCSS file)
const colorPalette = {
  primary: "#4F8A8B",
  secondary: "#FBD46D",
  accent: "#F67280",
  bg: "#FCFCFC",
  text: "#222",
  nav: "#F6F7FA",
};

type MainView =
  | "dashboard"
  | "joinCreate"
  | "classroom"
  ;

// PUBLIC_INTERFACE
/** Dashboard placeholder */
function Dashboard() {
  return (
    <section style={{ textAlign: "center", marginTop: 48 }}>
      <h2 style={{ color: colorPalette.primary, marginBottom: 16 }}>Dashboard</h2>
      <p style={{ color: colorPalette.text }}>See your joined Classrooms here.</p>
      <div style={{
        margin: "2rem auto", display: "flex", gap: "1.5rem", justifyContent: "center",
        flexWrap: "wrap"
      }}>
        <div style={{
          background: colorPalette.secondary,
          borderRadius: 16,
          width: 180,
          height: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px #e5e5e5",
          fontWeight: "bold",
          color: colorPalette.primary,
        }}>
          Classroom Card (stub)
        </div>
        <div style={{
          background: colorPalette.accent,
          borderRadius: 16,
          width: 180,
          height: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color: "#fff",
          boxShadow: "0 2px 8px #e5e5e5",
        }}>
          Add Classroom +
        </div>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
/** Classroom Join/Create placeholder */
function ClassroomJoinCreateForm() {
  return (
    <section style={{
      margin: "3rem auto",
      background: "#FFF",
      padding: 32,
      borderRadius: 18,
      maxWidth: 350,
      boxShadow: "0 2px 24px #e8e8e8"
    }}>
      <h2 style={{ marginBottom: 20, color: colorPalette.primary }}>
        Join or Create Classroom
      </h2>
      <input
        type="text"
        placeholder="Enter classroom code"
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          border: `1.5px solid ${colorPalette.primary}`,
          fontSize: 17,
          marginBottom: 14,
          outline: "none"
        }}
      />
      <div style={{ display: "flex", gap: 12 }}>
        <button style={{
          flex: 1,
          background: colorPalette.primary,
          color: "#fff",
          fontWeight: 600,
          borderRadius: 10,
          padding: "10px 0",
          border: "none",
          cursor: "pointer"
        }}>Join</button>
        <button style={{
          flex: 1,
          background: colorPalette.accent,
          color: "#fff",
          fontWeight: 600,
          borderRadius: 10,
          padding: "10px 0",
          border: "none",
          cursor: "pointer"
        }}>Create</button>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
/** Stub for in-classroom main view with tabs for sub-features */
function ClassroomView() {
  const [tab, setTab] = useState<"chat" | "bulletin" | "notebook" | "groups" | "calls">("chat");

  const tabMeta = [
    { key: "chat", label: "Chat 💬" },
    { key: "bulletin", label: "Bulletin Board 📌" },
    { key: "notebook", label: "Notebook 📒" },
    { key: "groups", label: "Group Projects 🧑‍🤝‍🧑" },
    { key: "calls", label: "Calls 🎤" },
  ] as const;

  let content: React.ReactNode = null;
  switch (tab) {
    case "chat":
      content = <ChatFeatureStub />;
      break;
    case "bulletin":
      content = <BulletinBoardStub />;
      break;
    case "notebook":
      content = <NotebookStub />;
      break;
    case "groups":
      content = <GroupProjectsStub />;
      break;
    case "calls":
      content = <AudioVideoCallsStub />;
      break;
    default:
      content = null;
  }

  return (
    <section style={{
      margin: "0 auto",
      maxWidth: 750,
      background: "#fff",
      borderRadius: 22,
      boxShadow: "0 2px 18px #eff0f4",
      padding: "26px 18px 32px 18px",
      marginTop: 35,
      minHeight: 340,
    }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 18, justifyContent: "center" }}>
        {tabMeta.map(tabEntry =>
          <button
            key={tabEntry.key}
            style={{
              background: tab === tabEntry.key ? colorPalette.primary : colorPalette.secondary,
              color: tab === tabEntry.key ? "#fff" : colorPalette.primary,
              border: "none",
              borderRadius: 18,
              padding: "8px 20px",
              fontWeight: 600,
              fontSize: 17,
              cursor: "pointer",
              boxShadow: tab === tabEntry.key ? "0 2px 7px #e1eafc" : "none",
              outline: "none"
            }}
            onClick={() => setTab(tabEntry.key as typeof tab)}
          >{tabEntry.label}</button>
        )}
      </div>
      <div>
        {content}
      </div>
    </section>
  );
}

// Feature stubs
// PUBLIC_INTERFACE
function ChatFeatureStub() {
  return (
    <div style={{
      textAlign: "center",
      color: colorPalette.primary,
      padding: "30px 0"
    }}>Chat feature coming soon! 💬</div>
  );
}
// PUBLIC_INTERFACE
function BulletinBoardStub() {
  return (
    <div style={{
      textAlign: "center",
      color: colorPalette.accent,
      padding: "30px 0"
    }}>Bulletin Board stub – Post reminders here! 📌</div>
  );
}
// PUBLIC_INTERFACE
function NotebookStub() {
  return (
    <div style={{
      textAlign: "center",
      color: colorPalette.secondary,
      padding: "30px 0",
      fontWeight: 600
    }}>Notebook space (stub) 📒</div>
  );
}
// PUBLIC_INTERFACE
function GroupProjectsStub() {
  return (
    <div style={{
      textAlign: "center",
      color: colorPalette.primary,
      padding: "30px 0"
    }}>
      Group Projects coming soon! 👫
    </div>
  );
}
// PUBLIC_INTERFACE
function AudioVideoCallsStub() {
  return (
    <div style={{
      textAlign: "center",
      color: colorPalette.accent,
      padding: "30px 0"
    }}>
      Audio/Video Calls (stub) 🎤
    </div>
  );
}

// PUBLIC_INTERFACE
/**
 * Main container for Classroom Connect -- hosts navigation and feature stubs.
 */
export const ClassroomConnectMainContainer: React.FC = () => {
  const [mainView, setMainView] = useState<MainView>("dashboard");

  return (
    <div style={{
      minHeight: "100vh",
      background: colorPalette.bg,
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Navbar */}
      <nav style={{
        width: "100%",
        background: colorPalette.primary,
        color: "#fff",
        boxSizing: "border-box",
        padding: "14px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 7px #e4e9f4"
      }}>
        <div style={{
          width: "95%",
          maxWidth: 1050,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{
            fontSize: "1.7rem",
            fontWeight: 700,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingLeft: 7
          }}>
            <span style={{
              background: colorPalette.secondary,
              color: colorPalette.primary,
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              marginRight: 7,
              fontFamily: "monospace",
              fontSize: "1.3rem",
            }}>✦</span>
            Classroom Connect
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setMainView("dashboard")}
              style={{
                background: mainView === "dashboard" ? colorPalette.secondary : "transparent",
                color: mainView === "dashboard" ? colorPalette.primary : "#fff",
                fontWeight: 700,
                borderRadius: 12,
                border: "none",
                padding: "8px 16px",
                fontSize: 15,
                cursor: "pointer",
                transition: "all 0.18s"
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => setMainView("joinCreate")}
              style={{
                background: mainView === "joinCreate" ? colorPalette.secondary : "transparent",
                color: mainView === "joinCreate" ? colorPalette.primary : "#fff",
                fontWeight: 700,
                borderRadius: 12,
                border: "none",
                padding: "8px 16px",
                fontSize: 15,
                cursor: "pointer"
              }}
            >
              Join/Create
            </button>
            <button
              onClick={() => setMainView("classroom")}
              style={{
                background: mainView === "classroom" ? colorPalette.secondary : "transparent",
                color: mainView === "classroom" ? colorPalette.primary : "#fff",
                fontWeight: 700,
                borderRadius: 12,
                border: "none",
                padding: "8px 16px",
                fontSize: 15,
                cursor: "pointer"
              }}
            >
              Classroom
            </button>
          </div>
        </div>
      </nav>
      {/* Main Content Switcher */}
      <main style={{
        flex: 1,
        padding: "38px 0 0 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        {mainView === "dashboard" && <Dashboard />}
        {mainView === "joinCreate" && <ClassroomJoinCreateForm />}
        {mainView === "classroom" && <ClassroomView />}
      </main>
      <footer style={{ textAlign: "center", color: "#bbb", fontSize: 14, margin: "20px 0 8px 0" }}>
        © {new Date().getFullYear()} Classroom Connect | Playful Collab Platform
      </footer>
    </div>
  );
};

// If default export is preferred for integration, uncomment next line:
// export default ClassroomConnectMainContainer;
