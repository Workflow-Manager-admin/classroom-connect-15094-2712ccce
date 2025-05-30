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

// Dashboard stub - will eventually list joined classrooms
const Dashboard = () => (
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

// Classroom joining/creation form stub
const ClassroomJoinCreateForm = () => (
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

// Feature stub components

const ChatFeatureStub = () => (
  <div style={{
    textAlign: "center",
    color: colorPalette.primary,
    padding: "30px 0"
  }}>Chat feature coming soon! 💬</div>
);
const BulletinBoardStub = () => (
  <div style={{
    textAlign: "center",
    color: colorPalette.accent,
    padding: "30px 0"
  }}>Bulletin Board stub – Post reminders here! 📌</div>
);
const NotebookStub = () => (
  <div style={{
    textAlign: "center",
    color: colorPalette.secondary,
    padding: "30px 0",
    fontWeight: 600
  }}>Notebook space (stub) 📒</div>
);
const GroupProjectsStub = () => (
  <div style={{
    textAlign: "center",
    color: colorPalette.primary,
    padding: "30px 0"
  }}>
    Group Projects coming soon! 👫
  </div>
);

const AudioVideoCallsStub = () => (
  <div style={{
    textAlign: "center",
    color: colorPalette.accent,
    padding: "30px 0"
  }}>
    Audio/Video Calls (stub) 🎤
  </div>
);

// ClassroomView: Tabs for feature stubs
const ClassroomView = () => {
  const [tab, setTab] = useState("chat");

  const tabMeta = [
    { key: "chat", label: "Chat 💬" },
    { key: "bulletin", label: "Bulletin Board 📌" },
    { key: "notebook", label: "Notebook 📒" },
    { key: "groups", label: "Group Projects 🧑‍🤝‍🧑" },
    { key: "calls", label: "Calls 🎤" },
  ];

  let content = null;
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
            onClick={() => setTab(tabEntry.key)}
          >{tabEntry.label}</button>
        )}
      </div>
      <div>
        {content}
      </div>
    </section>
  );
};

// PUBLIC_INTERFACE
export const ClassroomConnectMainContainer = () => {
  const [mainView, setMainView] = useState("dashboard");

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
            {/* Notebook SVG icon for playful logo */}
            <span style={{
              background: colorPalette.secondary,
              color: colorPalette.primary,
              borderRadius: "50%",
              width: 38,
              height: 38,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              marginRight: 7,
              fontFamily: "monospace",
              fontSize: "1.3rem",
              boxShadow: "0 1px 6px #fbf5d6",
            }}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                style={{ display: "block" }}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Notebook"
              >
                <rect x="6" y="5" width="18" height="22" rx="5" fill="#fffbea" stroke="#4F8A8B" strokeWidth="2"/>
                <rect x="8.5" y="7.5" width="13" height="2.5" rx="1.2" fill="#FBD46D"/>
                <rect x="8.5" y="14.5" width="13" height="1.5" rx="0.75" fill="#FFD780"/>
                <rect x="8.5" y="18.5" width="13" height="1.2" rx="0.6" fill="#FFD780"/>
                <rect x="8.5" y="22.5" width="8.5" height="1.2" rx="0.6" fill="#FFD780"/>
                <circle cx="8.8" cy="9.1" r="0.95" fill="#F67280"/>
                <circle cx="8.8" cy="15.2" r="0.7" fill="#F67280"/>
                <circle cx="8.8" cy="19.2" r="0.7" fill="#F67280"/>
                <circle cx="8.8" cy="23.2" r="0.7" fill="#F67280"/>
              </svg>
            </span>
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
// Optionally for legacy compat: export default ClassroomConnectMainContainer;
