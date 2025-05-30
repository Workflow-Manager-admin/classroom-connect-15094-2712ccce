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

/**
 * Classroom joining/creation form, cheerful card-like design,
 * now with Number of Members input (required for 'Create'),
 * classroom code auto-generation, and shareable link display.
 */
const generateClassroomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = '';
  for (let i = 0; i < 6; ++i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const ClassroomJoinCreateForm = () => {
  const [mode, setMode] = useState("join"); // or "create"
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const [membersInput, setMembersInput] = useState("");
  const [membersTouched, setMembersTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState(false);
  const [newClassroomCode, setNewClassroomCode] = useState("");
  const [newClassroomMembers, setNewClassroomMembers] = useState(null);

  // Backend config (update port if needed)
  const BACKEND_URL = "http://localhost:4555";
  // Use actual app origin for join link
  const APP_ORIGIN = typeof window !== "undefined" && window.location && window.location.origin
    ? window.location.origin
    : "https://yourapp.com";

  // Feedback state
  const [joinError, setJoinError] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [joinSuccessInfo, setJoinSuccessInfo] = useState(null);

  // Reset when mode changes
  React.useEffect(() => {
    setJoinCodeInput("");
    setMembersInput("");
    setCreated(false);
    setNewClassroomCode("");
    setNewClassroomMembers(null);
    setMembersTouched(false);
    setJoinError("");
    setCreateError("");
    setJoinSuccessInfo(null);
    setSubmitting(false);
    setJoinLoading(false);
  }, [mode]);

  // PUBLIC_INTERFACE
  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    setJoinError("");
    setJoinLoading(true);
    setJoinSuccessInfo(null);

    const code = joinCodeInput.trim().toUpperCase();
    if (!/^[A-Z0-9]{6}$/.test(code)) {
      setJoinError("Enter a valid 6-letter/digit code.");
      setJoinLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/classrooms/${code}`);
      if (res.status === 404) {
        setJoinError("Classroom not found. Check your code and try again.");
      } else if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setJoinError(data?.error || "Failed to join classroom.");
      } else {
        const body = await res.json();
        // Success! Optionally, record membership in localStorage/session here.
        setJoinError("");
        setJoinSuccessInfo(body.classroom);
        // alert(`Joined classroom "${body.classroom.code}"!`);
      }
    } catch (err) {
      setJoinError("Network error – could not reach backend.");
    }
    setJoinLoading(false);
    setJoinCodeInput("");
  };

  // PUBLIC_INTERFACE
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setCreateError("");
    setJoinError("");
    setJoinSuccessInfo(null);

    // Validate member count
    const count = parseInt(membersInput, 10);
    if (isNaN(count) || count < 1) {
      setSubmitting(false);
      setMembersTouched(true);
      setCreateError("Invalid members count.");
      return;
    }
    // Generate classroom code
    const code = generateClassroomCode();

    // POST to backend
    try {
      const res = await fetch(`${BACKEND_URL}/classrooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, members: count }),
      });
      if (res.status === 409) {
        setCreateError("Classroom code already exists. Try again.");
        setSubmitting(false);
        return;
      }
      if (res.status === 400) {
        const data = await res.json().catch(() => ({}));
        setCreateError(data?.error || "Invalid classroom data.");
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        setCreateError("Unknown error – failed to create classroom.");
        setSubmitting(false);
        return;
      }
      // Success: show confirmation
      setNewClassroomCode(code);
      setNewClassroomMembers(count);
      setCreated(true);
    } catch (err) {
      setCreateError("Network error – could not reach backend.");
    }
    setSubmitting(false);
  };

  // "Create" success confirmation UI
  if (created && mode === "create") {
    // Show confirmation and share link
    const joinUrl = `${APP_ORIGIN}/join/${newClassroomCode}`;
    return (
      <section
        style={{
          margin: "3.3rem auto",
          background: colorPalette.card,
          padding: 36,
          borderRadius: 22,
          maxWidth: 440,
          minWidth: 260,
          fontFamily: fontStack,
          boxShadow: colorPalette.shadow,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2 style={{
          marginBottom: 16,
          color: colorPalette.primary,
          fontWeight: 800,
          fontFamily: fontStack,
          fontSize: "1.45rem",
        }}>
          🎉 Classroom Created!
        </h2>
        <div style={{ fontWeight: 700, fontSize: 17.5, color: colorPalette.accent, margin: "8px 0 12px 0" }}>
          {newClassroomMembers} member{newClassroomMembers > 1 ? "s" : ""} (limit)
        </div>
        <div
          style={{
            margin: "0 0 15px 0",
            padding: "15px 15px 10px 15px",
            background: "#f7efeb",
            borderRadius: 13,
            minWidth: 222,
            maxWidth: 350,
            textAlign: "center",
            fontFamily: fontStack,
            boxShadow: "0 1.5px 8px #f0f5e6a8"
          }}
        >
          <div style={{ margin: "0 0 7px 0", fontWeight: 700, color: colorPalette.primary, fontSize: "1.12rem" }}>
            Join Code:
          </div>
          <div style={{ 
            fontSize: "2.1rem", 
            fontWeight: 900,
            letterSpacing: 2,
            color: colorPalette.accent, 
            marginBottom: 8,
            background: "#fffdf6",
            borderRadius: 10,
            padding: "7px 0 8px 0",
            userSelect: "all"
          }}>
            {newClassroomCode}
            <button
              onClick={() => navigator.clipboard && navigator.clipboard.writeText(newClassroomCode)}
              title="Copy code"
              style={{
                marginLeft: 11,
                background: "none",
                border: "none",
                color: colorPalette.primary,
                cursor: "pointer",
                fontSize: 22,
                verticalAlign: "middle"
              }}
            >📋</button>
          </div>
          <div style={{ fontSize: 16, color: "#222", fontWeight: 600, marginBottom: 5 }}>
            Share this link:
          </div>
          <div style={{
            padding: "7px 9px",
            borderRadius: 7,
            background: "#fff",
            border: `1px dotted ${colorPalette.primary}`,
            color: colorPalette.primary,
            margin: "0 0 7px 0",
            fontWeight: 680,
            fontSize: 15.5,
            wordBreak: "break-all"
          }}
          >
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: colorPalette.primary, textDecoration: "underline", fontWeight: 700, wordBreak: "break-all" }}
            >{joinUrl}</a>
            <button
              onClick={() => navigator.clipboard && navigator.clipboard.writeText(joinUrl)}
              title="Copy link"
              style={{
                marginLeft: 8,
                background: "none",
                border: "none",
                color: colorPalette.accent,
                cursor: "pointer",
                fontSize: 18,
                verticalAlign: "middle"
              }}
            >📋</button>
          </div>
        </div>
        <button
          style={{
            marginTop: 11,
            background: colorPalette.primary,
            color: "#fff",
            borderRadius: 10,
            padding: "11px 32px",
            border: "none",
            fontWeight: 700,
            fontFamily: fontStack,
            fontSize: 17,
            boxShadow: colorPalette.shadow,
            cursor: "pointer"
          }}
          onClick={() => {
            setCreated(false);
            setNewClassroomCode("");
            setNewClassroomMembers(null);
            setMembersInput("");
          }}
        >Create Another</button>
      </section>
    );
  }

  return (
    <section
      style={{
        margin: "3.3rem auto",
        background: colorPalette.card,
        padding: 36,
        borderRadius: 22,
        maxWidth: 370,
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
      <div style={{
        display: "flex",
        marginBottom: 15,
        gap: 7,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
      }}>
        <button
          onClick={() => setMode("join")}
          style={{
            flex: 1,
            borderRadius: 11,
            border: "none",
            fontFamily: fontStack,
            background: mode === "join" ? colorPalette.secondary : "#fbf7ea",
            color: mode === "join" ? colorPalette.primary : "#90949f",
            fontWeight: 800,
            fontSize: 16,
            padding: "7px 0",
            cursor: "pointer",
            transition: "background 0.14s"
          }}
        >🔑 Join</button>
        <button
          onClick={() => setMode("create")}
          style={{
            flex: 1,
            borderRadius: 11,
            border: "none",
            fontFamily: fontStack,
            background: mode === "create" ? colorPalette.secondary : "#fbf7ea",
            color: mode === "create" ? colorPalette.primary : "#90949f",
            fontWeight: 800,
            fontSize: 16,
            padding: "7px 0",
            cursor: "pointer",
            transition: "background 0.14s"
          }}
        >🎉 Create</button>
      </div>
      {mode === "join" ? (
        <form
          style={{ width: "100%", marginTop: 2 }}
          autoComplete="off"
          onSubmit={handleJoinSubmit}
        >
          <input
            type="text"
            value={joinCodeInput}
            onChange={e => setJoinCodeInput(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())}
            placeholder="Classroom code (e.g. ABC123)"
            required
            maxLength={6}
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
            disabled={joinLoading}
          />
          <button
            type="submit"
            disabled={joinLoading}
            style={{
              width: "100%",
              background: colorPalette.primary,
              color: "#fff",
              fontWeight: 700,
              borderRadius: 13,
              padding: "11px 0",
              border: "none",
              outline: "none",
              cursor: joinLoading ? "wait" : "pointer",
              fontSize: 17,
              fontFamily: fontStack,
              transition: "background 0.12s, box-shadow 0.13s",
              opacity: joinLoading ? 0.6 : 1
            }}
            onMouseOver={e => { if (!joinLoading) e.currentTarget.style.background = "#337e7d"; }}
            onMouseOut={e => { if (!joinLoading) e.currentTarget.style.background = colorPalette.primary; }}
            onFocus={e => { if (!joinLoading) e.currentTarget.style.background = "#337e7d"; }}
            onBlur={e => { if (!joinLoading) e.currentTarget.style.background = colorPalette.primary; }}
          >{joinLoading ? "Checking..." : "Join"}</button>

          {joinError && (
            <div style={{
              marginTop: 10,
              color: colorPalette.accent,
              fontWeight: 700,
              padding: "8px 0 0 0",
              minHeight: 24
            }}>
              {joinError}
            </div>
          )}
          {joinSuccessInfo && (
            <div style={{
              marginTop: 14,
              color: colorPalette.primary,
              fontWeight: 700,
              background: "#f3fff0",
              border: `1px solid ${colorPalette.primary}`,
              borderRadius: 9,
              padding: "10px 8px"
            }}>
              <span>Joined classroom <b>{joinSuccessInfo.code}</b> with {joinSuccessInfo.members} members!
                <br /><span style={{ fontWeight: 500, color: colorPalette.text, fontSize: 15 }}>Ready to participate.</span>
              </span>
            </div>
          )}
        </form>
      ) : (
        <form
          style={{ width: "100%", marginTop: 2 }}
          autoComplete="off"
          onSubmit={handleCreateSubmit}
        >
          <div style={{ marginBottom: 18 }}>
            <label
              htmlFor="number-members"
              style={{
                display: "block",
                fontWeight: 700,
                marginBottom: 5,
                color: colorPalette.primary,
                fontSize: 16
              }}
            >Number of members <span style={{ color: colorPalette.accent }}>*</span></label>
            <input
              id="number-members"
              type="number"
              min={1}
              max={200}
              required
              value={membersInput}
              onChange={e => {
                setMembersInput(e.target.value.replace(/[^0-9]/g, ""));
                setMembersTouched(true);
              }}
              style={{
                width: "100%",
                padding: "11px 12px",
                borderRadius: 12,
                border: membersTouched && (!membersInput || parseInt(membersInput, 10) < 1)
                  ? `2px solid ${colorPalette.accent}`
                  : `1.6px solid ${colorPalette.primary}`,
                fontSize: 17,
                outline: "none",
                background: colorPalette.bg,
                color: colorPalette.text,
                fontFamily: fontStack,
              }}
              aria-required="true"
            />
            {membersTouched && (!membersInput || parseInt(membersInput, 10) < 1) && (
              <div style={{ color: colorPalette.accent, fontSize: 13, marginTop: 4 }}>
                Please enter a valid, positive member count.
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={submitting || !membersInput || parseInt(membersInput, 10) < 1}
            style={{
              width: "100%",
              background: colorPalette.accent,
              color: "#fff",
              fontWeight: 700,
              borderRadius: 13,
              padding: "13px 0",
              border: "none",
              outline: "none",
              cursor: submitting ? "wait" : "pointer",
              fontSize: 18,
              fontFamily: fontStack,
              boxShadow: "0 1.5px 9px #fedaebcf",
              opacity: submitting ? 0.7 : 1,
              transition: "background 0.12s, box-shadow 0.13s"
            }}
            onMouseOver={e => {
              if (!submitting) e.currentTarget.style.background = "#fa4b6a";
            }}
            onMouseOut={e => {
              if (!submitting) e.currentTarget.style.background = colorPalette.accent;
            }}
            onFocus={e => {
              if (!submitting) e.currentTarget.style.background = "#fa4b6a";
            }}
            onBlur={e => {
              if (!submitting) e.currentTarget.style.background = colorPalette.accent;
            }}
          >
            {submitting ? "Creating..." : "Create Classroom"}
          </button>
          {createError && (
            <div style={{
              color: colorPalette.accent,
              fontWeight: 700,
              padding: "10px 0 0 0",
              minHeight: 22
            }}>
              {createError}
            </div>
          )}
        </form>
      )}
    </section>
  );
};

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

/**
 * ClassroomView: Playful tabs, curved card, soft section, lively behavior.
 */
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
    case "chat": content = <ChatFeatureStub />; break;
    case "bulletin": content = <BulletinBoardStub />; break;
    case "notebook": content = <NotebookStub />; break;
    case "groups": content = <GroupProjectsStub />; break;
    case "calls": content = <AudioVideoCallsStub />; break;
    default: content = null;
  }

  return (
    <section
      style={{
        margin: "0 auto",
        maxWidth: 780,
        background: colorPalette.card,
        borderRadius: 28,
        boxShadow: colorPalette.shadow,
        padding: "30px 4vw 20px 4vw",
        marginTop: 44,
        fontFamily: fontStack,
        minHeight: 330
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
          justifyContent: "center"
        }}
      >
        {tabMeta.map(tabEntry => (
          <button
            key={tabEntry.key}
            style={{
              background: tab === tabEntry.key ? colorPalette.primary : colorPalette.secondary,
              color: tab === tabEntry.key ? "#fff" : colorPalette.primary,
              border: "none",
              borderRadius: 40,
              padding: "10px 22px",
              fontWeight: 800,
              fontSize: 17,
              cursor: "pointer",
              fontFamily: fontStack,
              outline: "none",
              transition: "all 0.11s",
              boxShadow: tab === tabEntry.key
                ? "0 3px 14px #dfeffc"
                : "0 1px 2.5px #ffefd1",
              letterSpacing: 0.1,
              opacity: tab === tabEntry.key ? 1.0 : 0.84
            }}
            onClick={() => setTab(tabEntry.key)}
            onMouseOver={e => {
              if (tab !== tabEntry.key) {
                e.currentTarget.style.background = "#ffe37a";
                e.currentTarget.style.color = colorPalette.primary;
              }
            }}
            onMouseOut={e => {
              if (tab !== tabEntry.key) {
                e.currentTarget.style.background = colorPalette.secondary;
                e.currentTarget.style.color = colorPalette.primary;
              }
            }}
            tabIndex={0}
            aria-label={tabEntry.label}
          >
            {tabEntry.label}
          </button>
        ))}
      </div>
      {content}
    </section>
  );
};

/**
 * Main playful app UI chrome - prominent header, logo, background, nav.
 */
// PUBLIC_INTERFACE
export const ClassroomConnectMainContainer = () => {
  const [mainView, setMainView] = useState("dashboard");
  // Gentle background: subtle gradient or playful pattern, and rounded nav bar
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(-4deg, #f9fafb 60%, #fbd46d17 100%), ${colorPalette.bg}`,
        fontFamily: fontStack,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Playful Navbar */}
      <nav
        style={{
          width: "100%",
          background: colorPalette.primary,
          color: "#fff",
          boxSizing: "border-box",
          padding: "11px 0 11px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 3px 16px #dadee6, 0 1px 8px #ffd76e1a",
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          minHeight: 62,
          position: "relative"
        }}
      >
        <div
          style={{
            width: "97%",
            maxWidth: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: fontStack
          }}
        >
          <div
            style={{
              fontSize: "1.80rem",
              fontWeight: 900,
              letterSpacing: 1,
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingLeft: 9,
              color: "#fff",
              fontFamily: fontStack,
              textShadow: "0 1.5px 3px #a6e8ed70"
            }}
          >
            {/* Friendly notebook logo (SVG) */}
            <span
              style={{
                background: colorPalette.secondary,
                color: colorPalette.primary,
                borderRadius: "50%",
                width: 44,
                height: 44,
                minWidth: 44,
                minHeight: 44,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 7,
                marginLeft: 0,
                fontWeight: 900,
                fontFamily: fontStack,
                fontSize: "1.25rem",
                boxShadow: "0 1.2px 8px #fbf5d6",
                border: "2.5px solid #fffbe5"
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                style={{ display: "block" }}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Notebook"
              >
                <rect x="6" y="5" width="18" height="22" rx="5" fill="#fffbea" stroke="#4F8A8B" strokeWidth="2" />
                <rect x="8.5" y="7.5" width="13" height="2.5" rx="1.2" fill="#FBD46D" />
                <rect x="8.5" y="14.5" width="13" height="1.5" rx="0.75" fill="#FFD780" />
                <rect x="8.5" y="18.5" width="13" height="1.2" rx="0.6" fill="#FFD780" />
                <rect x="8.5" y="22.5" width="8.5" height="1.2" rx="0.6" fill="#FFD780" />
                <circle cx="8.8" cy="9.1" r="0.95" fill="#F67280" />
                <circle cx="8.8" cy="15.2" r="0.7" fill="#F67280" />
                <circle cx="8.8" cy="19.2" r="0.7" fill="#F67280" />
                <circle cx="8.8" cy="23.2" r="0.7" fill="#F67280" />
              </svg>
            </span>
            <span style={{ color: "#fff", fontWeight: 900, fontFamily: fontStack }}>Classroom Connect</span>
          </div>
          <div style={{ display: "flex", gap: 12, fontFamily: fontStack }}>
            <button
              onClick={() => setMainView("dashboard")}
              style={{
                background: mainView === "dashboard" ? colorPalette.secondary : "rgba(255,255,255,0.07)",
                color: mainView === "dashboard" ? colorPalette.primary : "#fff",
                fontWeight: 800,
                borderRadius: 18,
                border: "none",
                outline: "none",
                padding: "9px 18px",
                fontSize: 15.5,
                fontFamily: fontStack,
                cursor: "pointer",
                marginLeft: 2,
                marginRight: 2,
                boxShadow: mainView === "dashboard"
                  ? "0 2px 8px #f8e7b4"
                  : "0 0.5px 2px #97e5e341",
                transition: "all 0.14s"
              }}
              onMouseOver={e => {
                if (mainView !== "dashboard") {
                  e.currentTarget.style.background = "#ffe37a";
                  e.currentTarget.style.color = colorPalette.primary;
                }
              }}
              onMouseOut={e => {
                if (mainView !== "dashboard") {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.color = "#fff";
                }
              }}
              tabIndex={0}
              aria-label="Dashboard"
            >
              Dashboard
            </button>
            <button
              onClick={() => setMainView("joinCreate")}
              style={{
                background: mainView === "joinCreate" ? colorPalette.secondary : "rgba(255,255,255,0.07)",
                color: mainView === "joinCreate" ? colorPalette.primary : "#fff",
                fontWeight: 800,
                borderRadius: 18,
                border: "none",
                outline: "none",
                padding: "9px 18px",
                fontSize: 15.5,
                fontFamily: fontStack,
                cursor: "pointer",
                marginLeft: 2,
                marginRight: 2,
                boxShadow: mainView === "joinCreate"
                  ? "0 2px 8px #f8e7b4"
                  : "0 0.5px 2px #97e5e341",
                transition: "all 0.14s"
              }}
              onMouseOver={e => {
                if (mainView !== "joinCreate") {
                  e.currentTarget.style.background = "#ffe37a";
                  e.currentTarget.style.color = colorPalette.primary;
                }
              }}
              onMouseOut={e => {
                if (mainView !== "joinCreate") {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.color = "#fff";
                }
              }}
              tabIndex={0}
              aria-label="Join/Create"
            >
              Join/Create
            </button>
            <button
              onClick={() => setMainView("classroom")}
              style={{
                background: mainView === "classroom" ? colorPalette.secondary : "rgba(255,255,255,0.07)",
                color: mainView === "classroom" ? colorPalette.primary : "#fff",
                fontWeight: 800,
                borderRadius: 18,
                border: "none",
                outline: "none",
                padding: "9px 18px",
                fontSize: 15.5,
                fontFamily: fontStack,
                cursor: "pointer",
                marginLeft: 2,
                marginRight: 2,
                boxShadow: mainView === "classroom"
                  ? "0 2px 8px #f8e7b4"
                  : "0 0.5px 2px #97e5e341",
                transition: "all 0.14s"
              }}
              onMouseOver={e => {
                if (mainView !== "classroom") {
                  e.currentTarget.style.background = "#ffe37a";
                  e.currentTarget.style.color = colorPalette.primary;
                }
              }}
              onMouseOut={e => {
                if (mainView !== "classroom") {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.color = "#fff";
                }
              }}
              tabIndex={0}
              aria-label="Classroom"
            >
              Classroom
            </button>
          </div>
        </div>
      </nav>
      {/* Main Content Switcher */}
      <main
        style={{
          flex: 1,
          padding: "42px 0 0 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: fontStack
        }}
      >
        {mainView === "dashboard" && <Dashboard />}
        {mainView === "joinCreate" && <ClassroomJoinCreateForm />}
        {mainView === "classroom" && <ClassroomView />}
      </main>
      <footer
        style={{
          textAlign: "center",
          color: "#888",
          fontSize: 15.5,
          margin: "24px 0 15px 0",
          letterSpacing: 0.03,
          fontWeight: 500,
          fontFamily: fontStack
        }}
      >
        © {new Date().getFullYear()} Classroom Connect · For playful collaboration!
      </footer>
    </div>
  );
};
