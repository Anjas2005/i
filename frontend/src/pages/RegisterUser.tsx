import { useEffect, useRef, useState, type FormEvent } from "react";

import type { OperatorRole } from "../types";
import "./RegisterUser.css";

const roleOptions: {
  value: OperatorRole;
  label: string;
}[] = [
  { value: "DIRECTOR", label: "DIRECTOR" },
  { value: "THEORIST", label: "THEORIST" },
  { value: "GEOMETRY", label: "GEOMETRY" },
  { value: "CONTRIBUTOR", label: "CONTR." },
];

const rolePhilosophy: Record<
  OperatorRole,
  {
    title: string;
    description: string;
    principle: string;
  }
> = {
  DIRECTOR: {
    title: "THE ARCHITECT OF DIRECTION",
    description:
      "Every system needs a coherent destination. The Director sees beyond individual components, establishes direction, coordinates ideas, and accepts responsibility for the integrity of the whole.",
    principle: "VISION WITHOUT COHERENCE IS CHAOS.",
  },

  THEORIST: {
    title: "THE QUESTIONER OF ASSUMPTIONS",
    description:
      "Progress begins with questioning what everyone else accepts. The Theorist develops models, challenges assumptions, and searches for the principles that explain why a system works.",
    principle: "UNDERSTANDING PRECEDES INVENTION.",
  },

  GEOMETRY: {
    title: "THE DISCIPLINE OF STRUCTURE",
    description:
      "Abstract ideas become tangible through structure. Geometry is the discipline of proportion, boundaries, relationships, and precision. It transforms thought into an organized form.",
    principle: "FORM IS THOUGHT MADE VISIBLE.",
  },

  CONTRIBUTOR: {
    title: "THE CRAFT OF EXECUTION",
    description:
      "An idea has no value until someone brings it into existence. The Contributor builds, tests, documents, challenges, and improves. Every meaningful contribution strengthens the collective.",
    principle: "PROGRESS IS BUILT, NOT DECLARED.",
  },
};

type EntropyState = {
  label: string;
  level: number;
  strength: "empty" | "weak" | "acceptable" | "strong";
};

function getEntropy(value: string): EntropyState {
  if (!value.length) {
    return {
      label: "0% [EMPTY] // 0-BIT",
      level: 0,
      strength: "empty",
    };
  }

  if (value.length < 6) {
    return {
      label: "24% [WEAK] // 64-BIT",
      level: 1,
      strength: "weak",
    };
  }

  if (value.length < 10) {
    return {
      label: "68% [ACCEPTABLE] // 128-BIT",
      level: 2,
      strength: "acceptable",
    };
  }

  return {
    label: "98% [STRONG] // 256-BIT",
    level: 4,
    strength: "strong",
  };
}

function RegisterUser() {
  // Form state
  const [operatorHandle, setOperatorHandle] = useState("");
  const [operatorContact, setOperatorContact] = useState("");
  const [cipher, setCipher] = useState("");
  const [verifyCipher, setVerifyCipher] = useState("");

  // Selection state
  const [role, setRole] = useState<OperatorRole>("DIRECTOR");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Password visibility
  const [showCipher, setShowCipher] = useState(false);
  const [showVerifyCipher, setShowVerifyCipher] = useState(false);

  // Entropy telemetry
  const [entropy, setEntropy] = useState<EntropyState>(() => getEntropy(""));

  // Role tooltip
  const [hoveredRole, setHoveredRole] = useState<OperatorRole | null>(null);

  const roleHoverTimer = useRef<number | null>(null);

  function scheduleRoleTooltip(nextRole: OperatorRole) {
    if (roleHoverTimer.current !== null) {
      window.clearTimeout(roleHoverTimer.current);
    }

    setHoveredRole(null);

    roleHoverTimer.current = window.setTimeout(() => {
      setHoveredRole(nextRole);
    }, 2000);
  }

  function hideRoleTooltip() {
    if (roleHoverTimer.current !== null) {
      window.clearTimeout(roleHoverTimer.current);
      roleHoverTimer.current = null;
    }

    setHoveredRole(null);
  }

  useEffect(() => {
    return () => {
      if (roleHoverTimer.current !== null) {
        window.clearTimeout(roleHoverTimer.current);
      }
    };
  }, []);

  // ==================================
  // Functions to implement later
  // ==================================

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO: Implement operator registration.
  }

  function handleGithubRegister() {
    // TODO: Implement GitHub authentication.
  }

  function handleLogin() {
    // TODO: Navigate to login page.
  }

  return (
    <div className="register-page">
      {/* Viewport restriction */}
      <section className="viewport-warning">
        <div className="warning-panel">
          <span className="warning-label">■ SYSTEM NOTICE</span>

          <h1>VIEWPORT WIDTH INSUFFICIENT</h1>

          <p>
            This interface requires a minimum viewport width of
            <strong> 760px</strong>.
          </p>

          <p>Expand your application window to continue.</p>

          <span className="warning-code">
            ERR_VIEWPORT_BELOW_MINIMUM // REQUIRED: 760PX
          </span>
        </div>
      </section>

      {/* Main registration window */}
      <main className="register-card">
        {/* Top system bar */}
        <header className="register-topbar">
          <div className="topbar-left">
            <span className="online-square" />

            <span className="online-text">SYSTEM // ENROLLMENT</span>

            <span className="protocol">[PROTO_V4.2]</span>
          </div>

          <div className="topbar-right">
            <span>PORT:443</span>
            <strong>[SYS_AUTH]</strong>
          </div>
        </header>

        {/* Introduction */}
        <section className="register-intro">
          <div className="intro-heading">
            <span className="eyebrow">INITIALIZE CRYPTOGRAPHIC IDENTITY</span>

            <h1>REGISTER NEW OPERATOR</h1>
          </div>

          <div className="register-emblem">
            <pre>{`▄▀█▀▄
█ █ █
▀▄█▄▀
  █══`}</pre>
          </div>

          <p>
            Generate decentralized ED25519 root keys and join the
            high-throughput Bauhaus mesh node network.
          </p>
        </section>

        {/* Registration form */}
        <form className="register-form" onSubmit={handleSubmit}>
          {/* 01 — Operator handle */}
          <section className="form-group">
            <div className="field-heading">
              <label htmlFor="operator-handle">
                <span className="signal orange" />
                <span className="field-number">01 //</span>
                OPERATOR HANDLE
              </label>

              <span className="required-tag">[REQUIRED]</span>
            </div>

            <div className="input-shell handle-shell">
              <span className="input-prefix">node/~</span>

              <input
                id="operator-handle"
                name="handle"
                type="text"
                value={operatorHandle}
                onChange={(event) => setOperatorHandle(event.target.value)}
                placeholder="w_gropius"
                autoComplete="username"
              />
            </div>
          </section>

          {/* 02 — Discipline role */}
          <section className="form-group">
            <div className="role-selector">
              <div className="field-heading">
                <span className="field-label">
                  <span className="signal blue" />
                  <span className="field-number">02 //</span>
                  NODE DISCIPLINE ROLE
                </span>

                <span className={`role-indicator role-${role.toLowerCase()}`}>
                  [[{role} SELECTED]]
                </span>
              </div>

              <div className="role-grid">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={role === option.value}
                    aria-describedby={
                      hoveredRole === option.value
                        ? "role-philosophy-tooltip"
                        : undefined
                    }
                    className={`role-button role-${option.value.toLowerCase()} ${
                      role === option.value ? "selected" : ""
                    }`}
                    onClick={() => setRole(option.value)}
                    onMouseEnter={() => scheduleRoleTooltip(option.value)}
                    onMouseLeave={hideRoleTooltip}
                    onFocus={() => scheduleRoleTooltip(option.value)}
                    onBlur={hideRoleTooltip}
                  >
                    [{option.label}]
                  </button>
                ))}
              </div>

              {/* Role philosophy tooltip */}
              {hoveredRole && (
                <div
                  id="role-philosophy-tooltip"
                  className={`role-tooltip role-tooltip-${hoveredRole.toLowerCase()}`}
                  role="status"
                  aria-live="polite"
                >
                  <div className="role-tooltip-header">
                    <span className="role-tooltip-kicker">
                      [ ROLE PHILOSOPHY ]
                    </span>

                    <span className="role-tooltip-classification">
                      DISCIPLINE // {hoveredRole}
                    </span>
                  </div>

                  <h3>{rolePhilosophy[hoveredRole].title}</h3>

                  <p>{rolePhilosophy[hoveredRole].description}</p>

                  <div className="role-tooltip-principle">
                    <span>CORE PRINCIPLE</span>

                    <strong>{rolePhilosophy[hoveredRole].principle}</strong>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 03 — Contact */}
          <section className="form-group">
            <div className="field-heading">
              <label htmlFor="operator-contact">
                <span className="signal red" />
                <span className="field-number">03 //</span>
                OPERATOR CONTACT / RELAY
              </label>

              <span className="field-tag">[ENCRYPTED]</span>
            </div>

            <div className="input-shell">
              <input
                id="operator-contact"
                name="email"
                type="email"
                value={operatorContact}
                onChange={(event) => setOperatorContact(event.target.value)}
                placeholder="operator@bauhaus.mesh"
                autoComplete="email"
              />

              <span className="input-suffix">[@]</span>
            </div>
          </section>

          {/* 04 and 05 — Passwords */}
          <div className="password-grid">
            <section className="form-group">
              <label htmlFor="master-cipher" className="field-label">
                <span className="signal green" />
                <span className="field-number">04 //</span>
                MASTER CIPHER
              </label>

              <div className="input-shell">
                <input
                  id="master-cipher"
                  name="cipher"
                  type={showCipher ? "text" : "password"}
                  value={cipher}
                  onChange={(event) => {
                    const value = event.target.value;

                    setCipher(value);
                    setEntropy(getEntropy(value));
                  }}
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="reveal-button"
                  aria-label="Toggle master cipher visibility"
                  onClick={() => setShowCipher((current) => !current)}
                >
                  [⌕]
                </button>
              </div>
            </section>

            <section className="form-group">
              <label htmlFor="verify-cipher" className="field-label">
                <span className="signal green" />
                <span className="field-number">05 //</span>
                VERIFY CIPHER
              </label>

              <div className="input-shell">
                <input
                  id="verify-cipher"
                  name="verifyCipher"
                  type={showVerifyCipher ? "text" : "password"}
                  value={verifyCipher}
                  onChange={(event) => setVerifyCipher(event.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="reveal-button"
                  aria-label="Toggle verification cipher visibility"
                  onClick={() => setShowVerifyCipher((current) => !current)}
                >
                  [⌕]
                </button>
              </div>
            </section>
          </div>

          {/* Cipher entropy telemetry */}
          <section className="strength-panel">
            <div className="strength-heading">
              <span>
                <span className="strength-symbol">§</span>
                CIPHER ENTROPY TELEMETRY:
              </span>

              <strong className={`strength-${entropy.strength}`}>
                {entropy.label}
              </strong>
            </div>

            <div className="strength-meter">
              {[1, 2, 3, 4].map((segment) => {
                let segmentColor = "";

                if (entropy.strength === "weak" && segment === 1) {
                  segmentColor = "red-fill";
                }

                if (entropy.strength === "acceptable" && segment <= 2) {
                  segmentColor = segment === 1 ? "blue-fill" : "orange-fill";
                }

                if (entropy.strength === "strong" && segment <= 4) {
                  segmentColor = segment <= 2 ? "blue-fill" : "green-fill";
                }

                return <span key={segment} className={segmentColor} />;
              })}
            </div>
          </section>

          {/* Agreement */}
          <label className="terms">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
            />

            <span className="custom-checkbox" />

            <span className="terms-text">
              I AGREE TO THE{" "}
              <strong>BAUHAUS ENCRYPTED DIRECTIVE PROTOCOL</strong> &amp;{" "}
              <strong>HARD-GESCHWINDIGKEIT SLA</strong> (SUB-10MS RELAY).
            </span>
          </label>

          {/* Actions */}
          <div className="form-actions">
            <button type="submit" className="submit-button">
              <span>[ENTER]</span>
              <span>GENERATE KEYS &amp; JOIN MESH</span>
              <span className="submit-arrow">↵</span>
            </button>

            <button
              type="button"
              className="github-button"
              onClick={handleGithubRegister}
            >
              <span className="github-mark">[GH]</span>
              PROVISION VIA GITHUB IDENTITY PROVIDER
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer className="register-footer">
          <div className="footer-login">
            <span>ALREADY REGISTERED AS OPERATOR?</span>

            <button type="button" onClick={handleLogin}>
              [AUTHENTICATE EXISTING SESSION →]
            </button>
          </div>

          <div className="footer-telemetry">
            <div className="footer-status-group">
              <span className="footer-online">
                <span className="online-square" />
                CLIENT-SIDE ED25519
              </span>

              <span className="footer-divider">|</span>

              <span className="footer-status">STATUS: READY</span>
            </div>

            <span className="footer-mesh">MESH: 64 NODES ONLINE (100.0%)</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default RegisterUser;
