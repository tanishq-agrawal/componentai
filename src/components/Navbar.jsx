import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { HiSun, HiMoon } from 'react-icons/hi'
import { RiSettings3Fill } from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'

const Navbar = ({
  theme,
  setTheme,
  historyCount = 0,
  lastUsed,
  clearHistory,
  editorFontSize,
  setEditorFontSize,
  includeComments,
  setIncludeComments
}) => {

  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      {/* NAVBAR */}
      <div className="
        flex items-center justify-between
        px-[100px] h-[90px]
        border-b border-[var(--border-color)]
        bg-[var(--secondary-bg)]
      ">
        {/* LOGO */}
        <h3 className="text-[25px] font-[700] sp-text">
          ComponentAI
        </h3>

        {/* ICONS */}
        <div className="flex items-center gap-[15px]">

          {/* THEME TOGGLE */}
          <div
            className="icon"
            title="Toggle Theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <HiSun /> : <HiMoon />}
          </div>

          {/* PROFILE */}
          <div
            className="icon"
            title="Profile"
            onClick={() => {
              setShowProfile(!showProfile)
              setShowSettings(false)
            }}
          >
            <FaUser />
          </div>

          {/* SETTINGS */}
          <div
            className="icon"
            title="Settings"
            onClick={() => {
              setShowSettings(!showSettings)
              setShowProfile(false)
            }}
          >
            <RiSettings3Fill />
          </div>
        </div>
      </div>

      {/* ================= PROFILE DROPDOWN ================= */}
      {showProfile && (
        <div className="
          absolute right-[40px] top-[100px] w-[260px]
          bg-[var(--secondary-bg)] border border-[var(--border-color)]
          rounded-xl p-4 z-50
        ">
          <p className="font-bold mb-2">Guest User</p>

          <div className="text-sm text-[var(--text-secondary)] space-y-1">
            <p>Generated Components: {historyCount}</p>
            <p>
              Last Used:{" "}
              {lastUsed
                ? new Date(lastUsed).toLocaleString()
                : "—"}
            </p>
          </div>

          <button
            onClick={() => {
              clearHistory()
              setShowProfile(false)
            }}
            className="
              mt-4 w-full p-2 rounded-lg
              bg-[var(--tertiary-bg)]
              hover:opacity-80 text-sm
            "
          >
            Clear History
          </button>
        </div>
      )}

      {/* ================= SETTINGS PANEL ================= */}
      {showSettings && (
        <div className="
          absolute right-[40px] top-[100px] w-[280px]
          bg-[var(--secondary-bg)] border border-[var(--border-color)]
          rounded-xl p-4 z-50
        ">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold">Settings</p>
            <button onClick={() => setShowSettings(false)}>
              <IoClose />
            </button>
          </div>

          {/* EDITOR FONT SIZE */}
          <div className="mb-4">
            <label className="text-sm block mb-1">
              Editor Font Size
            </label>
            <input
              type="range"
              min="12"
              max="24"
              value={editorFontSize}
              onChange={(e) => setEditorFontSize(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs mt-1">
              {editorFontSize}px
            </p>
          </div>

          {/* INCLUDE COMMENTS */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Include Comments</span>
            <input
              type="checkbox"
              checked={includeComments}
              onChange={(e) => setIncludeComments(e.target.checked)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
