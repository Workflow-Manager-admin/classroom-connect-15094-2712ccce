import React from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#444",
      background: "#FFF4E9",
      fontFamily: "inherit"
    }}>
      <h2 style={{ color: "#E87A41", marginBottom: 18 }}>Legacy Template Loaded</h2>
      <div style={{
        background: "#fff",
        padding: 32,
        borderRadius: 18,
        boxShadow: "0 2px 18px #ececec",
        textAlign: "center",
        maxWidth: 410
      }}>
        <p>
          <span role="img" aria-label="lightbulb" style={{ fontSize: "1.5em" }}>💡</span>
          <br />
          The new main container is <b>ClassroomConnectMainContainer.tsx</b>.<br />
          Please update your entry point to use the new <b>ClassroomConnectMainContainer</b> for the full app scaffold.
        </p>
        <p style={{ marginTop: 24, color: "#aaa", fontSize: 16 }}>This template remains as a fallback example.</p>
      </div>
    </div>
  );
}

export default App;