import React, { useState } from "react";

// Colors and theme for playful, inviting, light-student style
const colorPalette = {
  primary: "#4F8A8B",
  secondary: "#FBD46D",
  accent: "#F67280",
  bg: "#FAFAFE",
  card: "#FFFDF9",
  cardAlt: "#FFF3F6",
  highlight: "#edfaff",
  text: "#242F32",
  nav: "#FFF9F0",
  shadow: "0 4px 22px 0 rgba(79, 138, 139, 0.07), 0 1.5px 8px 0 #fadfa6"
};

const fontStack = `'Nunito', 'Quicksand', 'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif`;

/**
 * Dashboard: Playful, friendly, student card overview with hoverable "Add" card.
 */
const Dashboard = () => (
  <section
    style={{
      textAlign: "center",
      marginTop: 60,
      fontFamily: fontStack,
      background: "transparent"
    }}
  >
    <h2 style={{
      color: colorPalette.primary,
      marginBottom: 8,
      fontWeight: 900,
      fontFamily: fontStack,
      fontSize: "2.1rem",
      letterSpacing: 1
    }}>
      Your Classrooms
    </h2>
    <p style={{
      color: colorPalette.text,
      fontWeight: 500,
      marginBottom: 25,
      letterSpacing: 0.15,
      fontSize: 17
    }}>Check your joined classrooms or add a new one!</p>
    <div style={{
      margin: "2.4rem auto 1.6rem",
      display: "flex",
      gap: "2.2rem",
      justifyContent: "center",
      flexWrap: "wrap",
      background: "transparent"
    }}>
      {/* Example of a joined classroom (stubbed) */}
      <div
        style={{
          background: colorPalette.card,
          borderRadius: 20,
          width: 200,
          height: 128,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: colorPalette.shadow,
          fontWeight: 700,
          color: colorPalette.primary,
          fontFamily: fontStack,
          transition: "transform 0.14s, box-shadow 0.15s",
          cursor: "pointer",
          fontSize: "1.15rem",
          position: "relative"
        }}
        tabIndex={0}
        onMouseOver={e => {
          e.currentTarget.style.transform = "scale(1.04)";
          e.currentTarget.style.boxShadow = "0 8px 32px 0 #ffe8bb";
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = colorPalette.shadow;
        }}
        onFocus={e => {
          e.currentTarget.style.transform = "scale(1.04)";
          e.currentTarget.style.boxShadow = "0 8px 32px 0 #ffe8bb";
        }}
        onBlur={e => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = colorPalette.shadow;
        }}
        aria-label="Classroom Example Card"
      >
        <span role="img" aria-label="green notebook" style={{ fontSize: "1.6em", marginRight: 10 }}>📗</span>
        Sample Classroom
      </div>
      {/* Add Classroom Card */}
      <div
        style={{
          background: colorPalette.accent,
          borderRadius: 20,
          width: 200,
          height: 128,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          color: "#fff",
          fontFamily: fontStack,
          fontSize: "1.12rem",
          boxShadow: colorPalette.shadow,
          cursor: "pointer",
          transition: "transform 0.14s, box-shadow 0.15s, background 0.13s",
          outline: "none",
          position: "relative"
        }}
        tabIndex={0}
        aria-label="Add Classroom"
        onMouseOver={e => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.background = "#fa4b6a";
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.background = colorPalette.accent;
        }}
        onFocus={e => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.background = "#fa4b6a";
        }}
        onBlur={e => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.background = colorPalette.accent;
        }}
      >
        <span
          style={{
            marginRight: 13,
            fontSize: "1.6em",
            display: "inline-block",
            filter: "drop-shadow(0 2px 5px #ffd7e1)"
          }}
          role="img"
          aria-label="add"
        >
          ➕
        </span>
        Add Classroom
      </div>
    </div>
  </section>
);

// Classroom joining/creation form, cheerful card-like design
const ClassroomJoinCreateForm = () => (
  <section
    style={{
      margin: "3.3rem auto",
      background: colorPalette.card,
      padding: 36,
      borderRadius: 22,
      maxWidth: 350,
      minWidth: 260,
      fontFamily: fontStack,
      boxShadow: colorPalette.shadow,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
    <h2 style={{
      marginBottom: 20,
      color: colorPalette.primary,
      fontWeight: 800,
      fontFamily: fontStack,
      fontSize: "1.53rem",
      letterSpacing: 0.5
    }}>
      Join or Create Classroom
    </h2>
    <input
      type="text"
      placeholder="🔑 Enter classroom code"
      style={{
        width: "99%",
        padding: "13px 12px",
        borderRadius: 13,
        border: `1.6px solid ${colorPalette.primary}`,
        fontSize: 18,
        marginBottom: 18,
        outline: "none",
        fontFamily: fontStack,
        background: colorPalette.bg,
        color: colorPalette.text,
        boxShadow: "0 1.5px 6px #f6f6f7"
      }}
    />
    <div style={{ display: "flex", gap: 12, justifyContent: "center", width: "100%" }}>
      <button
        style={{
          flex: 1,
          background: colorPalette.primary,
          color: "#fff",
          fontWeight: 700,
          borderRadius: 13,
          padding: "11px 0",
          border: "none",
          outline: "none",
          cursor: "pointer",
          fontSize: 17,
          fontFamily: fontStack,
          transition: "background 0.12s, box-shadow 0.13s"
        }}
        onMouseOver={e => { e.currentTarget.style.background = "#337e7d"; }}
        onMouseOut={e => { e.currentTarget.style.background = colorPalette.primary; }}
        onFocus={e => { e.currentTarget.style.background = "#337e7d"; }}
        onBlur={e => { e.currentTarget.style.background = colorPalette.primary; }}
      >Join
      </button>
      <button
        style={{
          flex: 1,
          background: colorPalette.accent,
          color: "#fff",
          fontWeight: 700,
          borderRadius: 13,
          padding: "11px 0",
          border: "none",
          outline: "none",
          cursor: "pointer",
          fontSize: 17,
          fontFamily: fontStack,
          transition: "background 0.12s, box-shadow 0.13s"
        }}
        onMouseOver={e => { e.currentTarget.style.background = "#fa4b6a"; }}
        onMouseOut={e => { e.currentTarget.style.background = colorPalette.accent; }}
        onFocus={e => { e.currentTarget.style.background = "#fa4b6a"; }}
        onBlur={e => { e.currentTarget.style.background = colorPalette.accent; }}
      >Create
      </button>
    </div>
  </section>
);

/**
 * Feature stub cards: Soft backgrounds, playful font, curved cards.
 */
const stubCard = (color, icon, text) => (
  <div
    style={{
      margin: "12px auto",
      padding: "36px 0 34px 0",
      width: "97%",
      background: color,
      borderRadius: 18,
      fontFamily: fontStack,
      fontWeight: 700,
      color: "#444",
      textAlign: "center",
      fontSize: "1.16rem",
      boxShadow: "0 1px 12px #f5f6f9, 0 1px 22px #fae9dc",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      letterSpacing: 0.03,
      minHeight: 98
    }}
  >
    <span style={{
      fontSize: "1.7em",
      marginBottom: 3,
      filter: "drop-shadow(0 1px 2px #fdf5ff)"
    }}>{icon}</span>
    <span>
      {text}
    </span>
  </div>
);

const ChatFeatureStub = () => stubCard(
  colorPalette.highlight,
  "💬",
  <>Public Chat coming soon! <span style={{ color: colorPalette.primary, fontWeight: 800 }}>Excited?</span></>
);

const BulletinBoardStub = () => stubCard(
  colorPalette.cardAlt,
  "📌",
  <>Bulletin Board for reminders coming soon!</>
);

const NotebookStub = () => stubCard(
  colorPalette.secondary,
  "📒",
  <>Collaborative Notebook (stub)<br />Let ideas fly!</>
);

const GroupProjectsStub = () => stubCard(
  "#E1F9F2",
  "🧑‍🤝‍🧑",
  <>Group Projects feature coming soon!</>
);

const AudioVideoCallsStub = () => stubCard(
  "#FFF1F8",
  "🎤",
  <>Audio/Video Calls (stub) <br />Connect soon!</>
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
