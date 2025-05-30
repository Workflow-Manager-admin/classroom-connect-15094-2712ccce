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
 * PUBLIC_INTERFACE
 * Helper: Read ALL classrooms for this user from browser storage.
 * Used everywhere joined classrooms list needs to be read.
 */
function getAllMyClassroomsFromStorage() {
  let classesRaw =
    (typeof window !== "undefined" &&
      (window.localStorage?.getItem("classroomconnect_myclassrooms") ||
        window.sessionStorage?.getItem("classroomconnect_myclassrooms"))) || "";
  let list = [];
  try {
    if (classesRaw) {
      if (classesRaw.trim().startsWith("[")) {
        list = JSON.parse(classesRaw);
      } else {
        list = classesRaw
          .split(",")
          .map((s) => ({ code: s.trim(), members: null }));
      }
    }
  } catch {
    list = [];
  }
  return Array.isArray(list) ? list : [];
}

/**
 * PUBLIC_INTERFACE
 * Helper: Add a classroom to localStorage/session, synchronizing both storage and state.
 * No-op if class already exists.
 */
function addClassroomToStorage(classroom, updateListState) {
  if (!classroom?.code) return;
  const code = classroom.code.toUpperCase();
  let list = getAllMyClassroomsFromStorage();
  if (list.find((c) => c.code === code)) return; // already joined
  list.push({
    code,
    members: classroom.members != null ? classroom.members : null
  });
  try {
    window.localStorage?.setItem(
      "classroomconnect_myclassrooms",
      JSON.stringify(list)
    );
    window.sessionStorage?.setItem(
      "classroomconnect_myclassrooms",
      JSON.stringify(list)
    );
  } catch {}
  if (typeof updateListState === "function") updateListState([...list]);
}

/*
 * Dashboard now accepts onEnterClassroom to trigger navigation.
 */
const Dashboard = ({
  myClassrooms,
  setMyClassrooms,
  onGoToJoinCreate,
  onEnterClassroom,
}) => {
  // Re-sync from storage on dashboard mount and when tab regains focus
  React.useEffect(() => {
    const refresh = () => setMyClassrooms(getAllMyClassroomsFromStorage());
    window.addEventListener("focus", refresh);
    refresh();
    return () => window.removeEventListener("focus", refresh);
  }, [setMyClassrooms]);

  const handleAddClassroom = () => {
    if (typeof onGoToJoinCreate === "function") onGoToJoinCreate();
  };

  // New: When class card is clicked, go to classroom
  const handleEnterClassroom = (classroom) => {
    if (typeof onEnterClassroom === "function") onEnterClassroom(classroom);
  };

  return (
    <section
      style={{
        textAlign: "center",
        marginTop: 60,
        fontFamily: fontStack,
        background: "transparent",
      }}
    >
      <h2
        style={{
          color: colorPalette.primary,
          marginBottom: 8,
          fontWeight: 900,
          fontFamily: fontStack,
          fontSize: "2.1rem",
          letterSpacing: 1,
        }}
      >
        Your Classrooms
      </h2>
      {myClassrooms.length > 0 ? (
        <>
          <p
            style={{
              color: colorPalette.text,
              fontWeight: 500,
              marginBottom: 25,
              letterSpacing: 0.15,
              fontSize: 17,
            }}
          >
            Here's a list of classrooms you've joined!
          </p>
          <div
            style={{
              margin: "2.4rem auto 1.6rem",
              display: "flex",
              gap: "2.2rem",
              justifyContent: "center",
              flexWrap: "wrap",
              background: "transparent",
            }}
          >
            {myClassrooms.map((classroom, idx) => (
              <div
                key={classroom.code || idx}
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
                  position: "relative",
                }}
                tabIndex={0}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.boxShadow = "0 8px 32px 0 #ffe8bb";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = colorPalette.shadow;
                }}
                onFocus={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.boxShadow = "0 8px 32px 0 #ffe8bb";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = colorPalette.shadow;
                }}
                aria-label={`Classroom ${classroom.code}`}
                title={`Classroom Code: ${classroom.code}${classroom.members ? ` (${classroom.members} members)` : ""}`}
                onClick={() => handleEnterClassroom(classroom)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleEnterClassroom(classroom);
                  }
                }}
              >
                <span
                  role="img"
                  aria-label="notebook"
                  style={{ fontSize: "1.6em", marginRight: 10 }}
                >
                  📗
                </span>
                <span>
                  {classroom.code}
                  {classroom.members ? (
                    <span
                      style={{
                        color: colorPalette.accent,
                        marginLeft: 5,
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      ({classroom.members})
                    </span>
                  ) : null}
                </span>
              </div>
            ))}
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
                transition:
                  "transform 0.14s, box-shadow 0.15s, background 0.13s",
                outline: "none",
                position: "relative",
              }}
              tabIndex={0}
              aria-label="Add Classroom"
              onClick={handleAddClassroom}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.06)";
                e.currentTarget.style.background = "#fa4b6a";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.background = colorPalette.accent;
              }}
              onFocus={(e) => {
                e.currentTarget.style.transform = "scale(1.06)";
                e.currentTarget.style.background = "#fa4b6a";
              }}
              onBlur={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.background = colorPalette.accent;
              }}
            >
              <span
                style={{
                  marginRight: 13,
                  fontSize: "1.6em",
                  display: "inline-block",
                  filter: "drop-shadow(0 2px 5px #ffd7e1)",
                }}
                role="img"
                aria-label="add"
              >
                ➕
              </span>
              Add Classroom
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            margin: "2.2rem auto 2.6rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 19,
              color: colorPalette.text,
              fontWeight: 700,
              marginBottom: 23,
            }}
          >
            You're not in any classrooms yet!
          </p>
          <button
            style={{
              background: colorPalette.accent,
              color: "#fff",
              border: "none",
              borderRadius: 18,
              padding: "17px 48px",
              fontWeight: 850,
              fontSize: 19,
              fontFamily: fontStack,
              boxShadow: colorPalette.shadow,
              cursor: "pointer",
              margin: "0 auto",
              marginBottom: 9,
              transition: "background 0.15s",
            }}
            onClick={handleAddClassroom}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#fa4b6a";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = colorPalette.accent;
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = "#fa4b6a";
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = colorPalette.accent;
            }}
            tabIndex={0}
            aria-label="Join/Create a Classroom"
          >
            ➕ Join or Create a Classroom
          </button>
          <span
            style={{
              color: colorPalette.primary,
              fontWeight: 500,
              fontSize: 15.5,
              marginTop: 7,
              opacity: 0.83,
            }}
          >
            Once you join, your classrooms will show here!
          </span>
        </div>
      )}
    </section>
  );
};

/**
 * Join/create classroom form. On join, validates against backend and emits storage/state update.
 */
const generateClassroomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; ++i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const ClassroomJoinCreateForm = ({
  myClassrooms,
  setMyClassrooms,
  onJoinedClassroom,
  setMainView
}) => {
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
  const APP_ORIGIN =
    typeof window !== "undefined" &&
    window.location &&
    window.location.origin
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

  // PUBLIC_INTERFACE (Join)
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
        setJoinError("");
        setJoinSuccessInfo(body.classroom);
        addClassroomToStorage(body.classroom, setMyClassrooms);
        if (typeof onJoinedClassroom === "function")
          onJoinedClassroom(body.classroom);
        // After showing success, go to dashboard
        setTimeout(() => typeof setMainView === "function" && setMainView("dashboard"), 1050);
      }
    } catch (err) {
      setJoinError("Network error – could not reach backend.");
    }
    setJoinLoading(false);
    setJoinCodeInput("");
  };

  // PUBLIC_INTERFACE (Create)
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
        body: JSON.stringify({ code, members: count })
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
        <h2
          style={{
            marginBottom: 16,
            color: colorPalette.primary,
            fontWeight: 800,
            fontFamily: fontStack,
            fontSize: "1.45rem"
          }}
        >
          🎉 Classroom Created!
        </h2>
        <div
          style={{
            fontWeight: 700,
            fontSize: 17.5,
            color: colorPalette.accent,
            margin: "8px 0 12px 0"
          }}
        >
          {newClassroomMembers} member
          {newClassroomMembers > 1 ? "s" : ""} (limit)
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
          <div
            style={{
              margin: "0 0 7px 0",
              fontWeight: 700,
              color: colorPalette.primary,
              fontSize: "1.12rem"
            }}
          >
            Join Code:
          </div>
          <div
            style={{
              fontSize: "2.1rem",
              fontWeight: 900,
              letterSpacing: 2,
              color: colorPalette.accent,
              marginBottom: 8,
              background: "#fffdf6",
              borderRadius: 10,
              padding: "7px 0 8px 0",
              userSelect: "all"
            }}
          >
            {newClassroomCode}
            <button
              onClick={() =>
                navigator.clipboard &&
                navigator.clipboard.writeText(newClassroomCode)
              }
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
            >
              📋
            </button>
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#222",
              fontWeight: 600,
              marginBottom: 5
            }}
          >
            Share this link:
          </div>
          <div
            style={{
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
              style={{
                color: colorPalette.primary,
                textDecoration: "underline",
                fontWeight: 700,
                wordBreak: "break-all"
              }}
            >
              {joinUrl}
            </a>
            <button
              onClick={() =>
                navigator.clipboard && navigator.clipboard.writeText(joinUrl)
              }
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
            >
              📋
            </button>
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
        >
          Create Another
        </button>
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
      <h2
        style={{
          marginBottom: 20,
          color: colorPalette.primary,
          fontWeight: 800,
          fontFamily: fontStack,
          fontSize: "1.53rem",
          letterSpacing: 0.5
        }}
      >
        Join or Create Classroom
      </h2>
      <div
        style={{
          display: "flex",
          marginBottom: 15,
          gap: 7,
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}
      >
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
        >
          🔑 Join
        </button>
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
        >
          🎉 Create
        </button>
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
            onChange={(e) =>
              setJoinCodeInput(
                e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
              )
            }
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
            onMouseOver={(e) => {
              if (!joinLoading) e.currentTarget.style.background = "#337e7d";
            }}
            onMouseOut={(e) => {
              if (!joinLoading) e.currentTarget.style.background = colorPalette.primary;
            }}
            onFocus={(e) => {
              if (!joinLoading) e.currentTarget.style.background = "#337e7d";
            }}
            onBlur={(e) => {
              if (!joinLoading) e.currentTarget.style.background = colorPalette.primary;
            }}
          >
            {joinLoading ? "Checking..." : "Join"}
          </button>
          {joinError && (
            <div
              style={{
                marginTop: 10,
                color: colorPalette.accent,
                fontWeight: 700,
                padding: "8px 0 0 0",
                minHeight: 24
              }}
            >
              {joinError}
            </div>
          )}
          {joinSuccessInfo && (
            <div
              style={{
                marginTop: 14,
                color: colorPalette.primary,
                fontWeight: 700,
                background: "#f3fff0",
                border: `1px solid ${colorPalette.primary}`,
                borderRadius: 9,
                padding: "10px 8px"
              }}
            >
              <span>
                Joined classroom <b>{joinSuccessInfo.code}</b> with{" "}
                {joinSuccessInfo.members} members!
                <br />
                <span
                  style={{
                    fontWeight: 500,
                    color: colorPalette.text,
                    fontSize: 15
                  }}
                >
                  Ready to participate.
                </span>
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
            >
              Number of members <span style={{ color: colorPalette.accent }}>*</span>
            </label>
            <input
              id="number-members"
              type="number"
              min={1}
              max={200}
              required
              value={membersInput}
              onChange={(e) => {
                setMembersInput(e.target.value.replace(/[^0-9]/g, ""));
                setMembersTouched(true);
              }}
              style={{
                width: "100%",
                padding: "11px 12px",
                borderRadius: 12,
                border:
                  membersTouched &&
                  (!membersInput || parseInt(membersInput, 10) < 1)
                    ? `2px solid ${colorPalette.accent}`
                    : `1.6px solid ${colorPalette.primary}`,
                fontSize: 17,
                outline: "none",
                background: colorPalette.bg,
                color: colorPalette.text,
                fontFamily: fontStack
              }}
              aria-required="true"
            />
            {membersTouched &&
              (!membersInput || parseInt(membersInput, 10) < 1) && (
                <div
                  style={{
                    color: colorPalette.accent,
                    fontSize: 13,
                    marginTop: 4
                  }}
                >
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
            onMouseOver={(e) => {
              if (!submitting) e.currentTarget.style.background = "#fa4b6a";
            }}
            onMouseOut={(e) => {
              if (!submitting) e.currentTarget.style.background = colorPalette.accent;
            }}
            onFocus={(e) => {
              if (!submitting) e.currentTarget.style.background = "#fa4b6a";
            }}
            onBlur={(e) => {
              if (!submitting) e.currentTarget.style.background = colorPalette.accent;
            }}
          >
            {submitting ? "Creating..." : "Create Classroom"}
          </button>
          {createError && (
            <div
              style={{
                color: colorPalette.accent,
                fontWeight: 700,
                padding: "10px 0 0 0",
                minHeight: 22
              }}
            >
              {createError}
            </div>
          )}
        </form>
      )}
    </section>
  );
};

/**
 * Feature card utility (for stubs and playful containers)
 */
const stubCard = (color, icon, text) => (
  <div
    style={{
      margin: "16px auto",
      padding: "34px 0 30px 0",
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
      minHeight: 98,
      transition: "box-shadow 0.12s"
    }}
  >
    <span
      style={{
        fontSize: "1.7em",
        marginBottom: 8,
        filter: "drop-shadow(0 1px 2px #fdf5ff)"
      }}
    >
      {icon}
    </span>
    <span>{text}</span>
  </div>
);

/* ---- Chat Tab Stub ---- */
const ClassroomChatStub = () => (
  <div
    style={{
      padding: 0,
      margin: 0,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
    {stubCard(
      colorPalette.highlight,
      "💬",
      <>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontWeight: 800, color: colorPalette.primary }}>
            General In-Class Chat
          </span>
        </div>
        <div style={{
          width: "90%",
          margin: "10px auto",
          background: "#f6ffff",
          borderRadius: 12,
          border: `1px dashed ${colorPalette.primary}`,
          padding: 18,
          minHeight: 60,
          textAlign: "left",
          color: "#348080",
          fontSize: 15.2
        }}>
          {/* Message list placeholder */}
          <div style={{ color: "#94a9a9" }}>
            <b>No messages yet!</b>
            <br />
            When someone says hi, messages will appear here.
          </div>
        </div>
        <form style={{ width: "88%", margin: "0 auto", marginTop: 15, display: "flex", gap: 8 }}>
          <input
            type="text"
            style={{
              flex: 1,
              borderRadius: 10,
              border: `1px solid ${colorPalette.primary}`,
              padding: "9px 12px",
              fontSize: 15.5,
              fontFamily: fontStack,
              background: "#fffefb",
              color: "#115",
              outline: "none"
            }}
            placeholder="Type a message (stubbed, not sent)…"
            disabled
          />
          <button
            style={{
              background: colorPalette.primary,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 16,
              fontFamily: fontStack,
              padding: "8px 24px",
              cursor: "not-allowed",
              boxShadow: colorPalette.shadow
            }}
            type="button"
            disabled
            aria-label="Send disabled"
          >
            Send
          </button>
        </form>
      </>
    )}
  </div>
);

/* ---- Bulletin Board Tab Stub ---- */
const ClassroomBulletinStub = () => (
  <div style={{ width: "100%", margin: 0, padding: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
    {stubCard(
      colorPalette.cardAlt,
      "📌",
      <div style={{ width: "98%", margin: 0, textAlign: "left" }}>
        <div style={{ marginBottom: 8, color: colorPalette.primary, fontWeight: 800 }}>
          Bulletin Board <span style={{ color: colorPalette.accent }}>(stub)</span>
        </div>
        <div
          style={{
            margin: "8px auto 14px auto",
            background: "#fffdfa",
            borderRadius: 12,
            border: "1px solid #ffdca2",
            boxShadow: "0 1px 6px #ffeccb",
            padding: 14,
            color: "#6a5346",
            fontSize: 16.2
          }}
        >
          <ul style={{ padding: "0 0 0 20px", margin: 0 }}>
            <li style={{ marginBottom: 8 }}>
              Sample Announcement:{" "}
              <b style={{ color: "#F8AC6B" }}>Project presentations are Friday!</b>
              <div>
                <button style={{
                  background: colorPalette.secondary, border: "none", color: colorPalette.primary,
                  fontWeight: 700, borderRadius: 7, padding: "2px 10px", fontSize: 13, marginRight: 8, cursor: "not-allowed"
                }} title="Edit (stub)" disabled>Edit</button>
                <button style={{
                  background: colorPalette.accent, border: "none", color: "#fff",
                  fontWeight: 700, borderRadius: 7, padding: "2px 10px", fontSize: 13, cursor: "not-allowed"
                }} title="Delete (stub)" disabled>Delete</button>
              </div>
            </li>
            <li>
              Reminder: <span style={{ color: "#eed77b", fontWeight: 600 }}>Field trip forms due tomorrow.</span>
              <div>
                <button style={{
                  background: colorPalette.secondary, border: "none", color: colorPalette.primary,
                  fontWeight: 700, borderRadius: 7, padding: "2px 10px", fontSize: 13, marginRight: 8, cursor: "not-allowed"
                }} title="Edit (stub)" disabled>Edit</button>
                <button style={{
                  background: colorPalette.accent, border: "none", color: "#fff",
                  fontWeight: 700, borderRadius: 7, padding: "2px 10px", fontSize: 13, cursor: "not-allowed"
                }} title="Delete (stub)" disabled>Delete</button>
              </div>
            </li>
          </ul>
        </div>
        <div
          style={{
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
            opacity: 0.75
          }}
        >
          <input
            placeholder="Write an announcement… (stub)"
            style={{
              borderRadius: 10,
              border: `1px solid ${colorPalette.primary}`,
              fontSize: 15,
              padding: "8px 11px",
              fontFamily: fontStack,
              minWidth: 0,
              width: 220,
              outline: "none"
            }}
            disabled
          />
          <button
            style={{
              background: colorPalette.primary,
              color: "#fff",
              border: "none",
              borderRadius: 7,
              fontWeight: 700,
              fontSize: 16,
              padding: "7px 16px",
              cursor: "not-allowed"
            }}
            type="button"
            disabled
          >
            Post
          </button>
        </div>
      </div>
    )}
  </div>
);

/* ---- Notebook Tab Stub (PDF) ---- */
const ClassroomNotebookStub = () => (
  <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
    {stubCard(
      colorPalette.secondary,
      "📒",
      <>
        <div style={{ marginBottom: 11, color: colorPalette.primary, fontWeight: 800 }}>Classroom Notebook <span style={{ color: colorPalette.accent, fontWeight: 700 }}>(stub)</span></div>
        <div style={{
          border: "1.5px dotted #ffb966",
          borderRadius: 11,
          padding: 20,
          background: "#fffbeb",
          color: "#7D6B4A",
          margin: "6px auto 12px",
          width: "92%",
          minHeight: 80,
          fontSize: 15.7
        }}>
          No notes yet. You can upload PDFs and everyone can view them. (Feature coming soon!)
          <br />
          <span style={{ fontSize: 21, color: "#ddb644" }}>📄</span>
          <span style={{ color: "#a5904b", fontSize: 14, fontWeight: 600 }}>
            (PDF Upload/Display Stub)
          </span>
        </div>
        <div style={{ marginTop: 7 }}>
          <input
            type="file"
            accept="application/pdf"
            style={{ display: "inline-block", fontFamily: fontStack }}
            disabled
            aria-label="PDF upload disabled"
          />
          <button
            style={{
              background: colorPalette.primary,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15.5,
              padding: "8px 18px",
              marginLeft: 10,
              cursor: "not-allowed"
            }}
            type="button"
            disabled
          >
            Upload
          </button>
        </div>
      </>
    )}
  </div>
);

/* ---- Services Tab: Group Projects & Calls (add placeholders) ---- */
const ClassroomServicesStub = () => (
  <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 24,
      justifyContent: "center",
      width: "99%",
      margin: "0 auto"
    }}>
    {/* Group Projects Card */}
    <div style={{
      background: "#E1F9F2",
      borderRadius: 18,
      minWidth: 280,
      minHeight: 175,
      boxShadow: colorPalette.shadow,
      padding: "34px 16px 24px 16px",
      margin: "7px 0 7px 0",
      fontFamily: fontStack,
      color: "#348080",
      fontWeight: 700,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative"
    }}>
      <div style={{ fontSize: "2.0em", marginBottom: 7, lineHeight: 1 }}>🧑‍🤝‍🧑</div>
      <div style={{ fontSize: 18.5, color: "#229684", fontWeight: 900, marginBottom: 11 }}>
        Group Projects
      </div>
      <div style={{ fontSize: 14.5, color: "#358e80", marginBottom: 8 }}>
        Form teams, assign tasks, and track progress. <br />
        <span style={{ color: colorPalette.secondary, fontWeight: 600 }}>
          (Feature coming soon)
        </span>
      </div>
      <button
        style={{
          background: "#a2e6d7",
          color: "#115950",
          borderRadius: 38,
          border: "none",
          fontWeight: 700,
          fontSize: 20,
          padding: "7px 19px",
          marginTop: 10,
          boxShadow: "0 1.5px 7px #b0fff1",
          cursor: "not-allowed",
          display: "flex",
          alignItems: "center"
        }}
        type="button"
        disabled
        aria-label="Add Group Project (stub)"
        title="Add Group Project (coming soon)"
      >
        <span style={{ fontSize: 22, marginRight: 8 }}>➕</span>
        Add Project
      </button>
    </div>
    {/* Audio/Video Calls Card */}
    <div style={{
      background: "#FFF1F8",
      borderRadius: 18,
      minWidth: 280,
      minHeight: 175,
      boxShadow: colorPalette.shadow,
      padding: "34px 16px 24px 16px",
      margin: "7px 0 7px 0",
      fontFamily: fontStack,
      color: "#cf4e8d",
      fontWeight: 700,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative"
    }}>
      <div style={{ fontSize: "2.0em", marginBottom: 7, lineHeight: 1 }}>🎤</div>
      <div style={{ fontSize: 18.5, color: "#E53D74", fontWeight: 900, marginBottom: 11 }}>
        Audio / Video Calls
      </div>
      <div style={{ fontSize: 14.5, color: "#B24E7B", marginBottom: 8 }}>
        Talk live with classmates.<br />
        <span style={{ color: colorPalette.secondary, fontWeight: 600 }}>
          (Feature coming soon)
        </span>
      </div>
      <button
        style={{
          background: "#ffd1ea",
          color: "#bc2071",
          borderRadius: 38,
          border: "none",
          fontWeight: 700,
          fontSize: 20,
          padding: "7px 19px",
          marginTop: 10,
          boxShadow: "0 1.2px 7px #ffe3fb",
          cursor: "not-allowed",
          display: "flex",
          alignItems: "center"
        }}
        type="button"
        disabled
        aria-label="Add Call (stub)"
        title="Add Call (coming soon)"
      >
        <span style={{ fontSize: 22, marginRight: 8 }}>➕</span>
        Add Call
      </button>
    </div>
  </div>
);

/**
 * ClassroomView: tabbed navigation for primary in-classroom features
 */
const ClassroomView = () => {
  // All tab keys are lower-case for state
  const [tab, setTab] = useState("chat");

  const tabs = [
    { key: "chat", label: <>Chat <span style={{fontSize:18}}>💬</span></> },
    { key: "bulletin", label: <>Bulletin Board <span style={{fontSize:18}}>📌</span></> },
    { key: "notebook", label: <>Notebook <span style={{fontSize:18}}>📒</span></> },
    { key: "services", label: <>Services <span style={{fontSize:18}}>🛠️</span></> }
  ];

  let content = null;
  switch (tab) {
    case "chat":
      content = <ClassroomChatStub />;
      break;
    case "bulletin":
      content = <ClassroomBulletinStub />;
      break;
    case "notebook":
      content = <ClassroomNotebookStub />;
      break;
    case "services":
      content = <ClassroomServicesStub />;
      break;
    default:
      content = null;
  }

  return (
    <section
      style={{
        margin: "0 auto",
        maxWidth: 780,
        background: colorPalette.card,
        borderRadius: 28,
        boxShadow: colorPalette.shadow,
        padding: "30px 4vw 24px 4vw",
        marginTop: 44,
        fontFamily: fontStack,
        minHeight: 330
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
          justifyContent: "center"
        }}
      >
        {tabs.map((tabEntry) => (
          <button
            key={tabEntry.key}
            style={{
              background:
                tab === tabEntry.key
                  ? colorPalette.primary
                  : colorPalette.secondary,
              color: tab === tabEntry.key ? "#fff" : colorPalette.primary,
              border: "none",
              borderRadius: 40,
              padding: "10px 25px",
              fontWeight: 800,
              fontSize: 17,
              cursor: "pointer",
              fontFamily: fontStack,
              outline: "none",
              transition: "all 0.11s",
              boxShadow:
                tab === tabEntry.key
                  ? "0 3px 14px #dfeffc"
                  : "0 1px 2.5px #ffefd1",
              letterSpacing: 0.1,
              opacity: tab === tabEntry.key ? 1.0 : 0.84,
              position: "relative"
            }}
            onClick={() => setTab(tabEntry.key)}
            onMouseOver={(e) => {
              if (tab !== tabEntry.key) {
                e.currentTarget.style.background = "#ffe37a";
                e.currentTarget.style.color = colorPalette.primary;
              }
            }}
            onMouseOut={(e) => {
              if (tab !== tabEntry.key) {
                e.currentTarget.style.background = colorPalette.secondary;
                e.currentTarget.style.color = colorPalette.primary;
              }
            }}
            tabIndex={0}
            aria-label={typeof tabEntry.label === "string" ? tabEntry.label : undefined}
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
 * PUBLIC_INTERFACE
 * Main Container: holds classrooms list state, passes it down, and updates on join.
 */
export const ClassroomConnectMainContainer = () => {
  // Track: main view (dashboard, joinCreate, classroom), and which classroom is open (if any)
  const [mainView, setMainView] = useState("dashboard");
  const [myClassrooms, setMyClassrooms] = useState(getAllMyClassroomsFromStorage());
  const [activeClassroom, setActiveClassroom] = useState(null);

  // Open join/create flow
  const goToJoinCreate = () => setMainView("joinCreate");

  // After classroom joined, go straight to classroom and remember which
  const handleJoinedClassroom = (classroom) => {
    // Safety: ensure the code is normalized
    if (classroom && classroom.code) {
      setActiveClassroom(classroom);
      setMainView("classroom");
    }
  };

  // Open classroom from dashboard
  const handleEnterClassroom = (classroom) => {
    if (classroom && classroom.code) {
      setActiveClassroom(classroom);
      setMainView("classroom");
    }
  };

  // Optional: handle leaving a classroom, just returns to dashboard for now
  const handleLeaveClassroom = () => {
    setActiveClassroom(null);
    setMainView("dashboard");
  };

  // ClassroomView: now gets classroom prop and return handler
  const ClassroomViewContainer = ({ classroom }) => (
    <div>
      <div style={{ marginBottom: 15, marginTop: 10, textAlign: "right" }}>
        <button
          style={{
            background: colorPalette.accent,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "7px 21px",
            fontWeight: 700,
            fontFamily: fontStack,
            fontSize: 16,
            float: "right",
            cursor: "pointer",
            margin: "0 7px 0 0",
            boxShadow: colorPalette.shadow,
            transition: "background 0.12s"
          }}
          onClick={handleLeaveClassroom}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#fa4b6a";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = colorPalette.accent;
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
      <h2 style={{
        color: colorPalette.primary,
        fontFamily: fontStack,
        fontWeight: 900,
        letterSpacing: 1,
        fontSize: "2.0rem",
        marginBottom: 6,
        marginTop: 24,
        textAlign: "center",
      }}>
        Classroom <b>{classroom.code}</b>
        {classroom.members ? (
          <span style={{
            color: colorPalette.accent,
            marginLeft: 12,
            fontWeight: 700,
            fontSize: 19
          }}>
            ({classroom.members} members)
          </span>
        ) : null}
      </h2>
      <div style={{marginBottom: 30}} />
      <ClassroomView />
    </div>
  );

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
          position: "relative",
        }}
      >
        <div
          style={{
            width: "97%",
            maxWidth: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: fontStack,
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
              textShadow: "0 1.5px 3px #a6e8ed70",
            }}
          >
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
                border: "2.5px solid #fffbe5",
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
                <rect
                  x="6"
                  y="5"
                  width="18"
                  height="22"
                  rx="5"
                  fill="#fffbea"
                  stroke="#4F8A8B"
                  strokeWidth="2"
                />
                <rect
                  x="8.5"
                  y="7.5"
                  width="13"
                  height="2.5"
                  rx="1.2"
                  fill="#FBD46D"
                />
                <rect
                  x="8.5"
                  y="14.5"
                  width="13"
                  height="1.5"
                  rx="0.75"
                  fill="#FFD780"
                />
                <rect
                  x="8.5"
                  y="18.5"
                  width="13"
                  height="1.2"
                  rx="0.6"
                  fill="#FFD780"
                />
                <rect
                  x="8.5"
                  y="22.5"
                  width="8.5"
                  height="1.2"
                  rx="0.6"
                  fill="#FFD780"
                />
                <circle cx="8.8" cy="9.1" r="0.95" fill="#F67280" />
                <circle cx="8.8" cy="15.2" r="0.7" fill="#F67280" />
                <circle cx="8.8" cy="19.2" r="0.7" fill="#F67280" />
                <circle cx="8.8" cy="23.2" r="0.7" fill="#F67280" />
              </svg>
            </span>
            <span
              style={{
                color: "#fff",
                fontWeight: 900,
                fontFamily: fontStack,
              }}
            >
              Classroom Connect
            </span>
          </div>
          <div style={{ display: "flex", gap: 12, fontFamily: fontStack }}>
            <button
              onClick={() => {
                setMainView("dashboard");
                setActiveClassroom(null);
              }}
              style={{
                background:
                  mainView === "dashboard"
                    ? colorPalette.secondary
                    : "rgba(255,255,255,0.07)",
                color:
                  mainView === "dashboard"
                    ? colorPalette.primary
                    : "#fff",
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
                boxShadow:
                  mainView === "dashboard"
                    ? "0 2px 8px #f8e7b4"
                    : "0 0.5px 2px #97e5e341",
                transition: "all 0.14s",
              }}
              onMouseOver={(e) => {
                if (mainView !== "dashboard") {
                  e.currentTarget.style.background = "#ffe37a";
                  e.currentTarget.style.color = colorPalette.primary;
                }
              }}
              onMouseOut={(e) => {
                if (mainView !== "dashboard") {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.07)";
                  e.currentTarget.style.color = "#fff";
                }
              }}
              tabIndex={0}
              aria-label="Dashboard"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setMainView("joinCreate");
                setActiveClassroom(null);
              }}
              style={{
                background:
                  mainView === "joinCreate"
                    ? colorPalette.secondary
                    : "rgba(255,255,255,0.07)",
                color:
                  mainView === "joinCreate"
                    ? colorPalette.primary
                    : "#fff",
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
                boxShadow:
                  mainView === "joinCreate"
                    ? "0 2px 8px #f8e7b4"
                    : "0 0.5px 2px #97e5e341",
                transition: "all 0.14s",
              }}
              onMouseOver={(e) => {
                if (mainView !== "joinCreate") {
                  e.currentTarget.style.background = "#ffe37a";
                  e.currentTarget.style.color = colorPalette.primary;
                }
              }}
              onMouseOut={(e) => {
                if (mainView !== "joinCreate") {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.07)";
                  e.currentTarget.style.color = "#fff";
                }
              }}
              tabIndex={0}
              aria-label="Join/Create"
            >
              Join/Create
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
          fontFamily: fontStack,
        }}
      >
        {mainView === "dashboard" && (
          <Dashboard
            myClassrooms={myClassrooms}
            setMyClassrooms={setMyClassrooms}
            onGoToJoinCreate={goToJoinCreate}
            onEnterClassroom={handleEnterClassroom}
          />
        )}
        {mainView === "joinCreate" && (
          <ClassroomJoinCreateForm
            myClassrooms={myClassrooms}
            setMyClassrooms={setMyClassrooms}
            onJoinedClassroom={handleJoinedClassroom}
            setMainView={setMainView}
          />
        )}
        {mainView === "classroom" && activeClassroom && (
          <ClassroomViewContainer classroom={activeClassroom} />
        )}
      </main>
      <footer
        style={{
          textAlign: "center",
          color: "#888",
          fontSize: 15.5,
          margin: "24px 0 15px 0",
          letterSpacing: 0.03,
          fontWeight: 500,
          fontFamily: fontStack,
        }}
      >
        © {new Date().getFullYear()} Classroom Connect · For playful collaboration!
      </footer>
    </div>
  );
};
