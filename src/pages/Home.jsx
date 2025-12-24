import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Select from 'react-select'
import { BsStars } from 'react-icons/bs'
import { HiOutlineCode } from 'react-icons/hi'
import Editor from '@monaco-editor/react'
import { IoCloseSharp, IoCopy } from 'react-icons/io5'
import { PiExportBold } from 'react-icons/pi'
import { ImNewTab } from 'react-icons/im'
import { FiRefreshCcw } from 'react-icons/fi'
import { GoogleGenAI } from "@google/genai"
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const Home = ({ theme, setTheme }) => {

  /* ===================== OPTIONS ===================== */
  const options = [
    { value: 'html-css', label: 'HTML + CSS' },
    { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
    { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
    { value: 'html-css-js', label: 'HTML + CSS + JS' },
    { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap' },
  ]

  /* ===================== STATES ===================== */
  const [outputScreen, setOutputScreen] = useState(false)
  const [tab, setTab] = useState(1)
  const [prompt, setPrompt] = useState("")
  const [frameWork, setFrameWork] = useState(options[0])
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [isNewTabOpen, setIsNewTabOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const [history, setHistory] = useState([])
  const [editorFontSize, setEditorFontSize] = useState(14)
  const [includeComments, setIncludeComments] = useState(true)

  /* ===================== LOAD FROM LOCAL STORAGE ===================== */
  useEffect(() => {
    const savedHistory = localStorage.getItem("componentai-history")
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory)
      setHistory(parsed)

      if (parsed.length > 0) {
        setPrompt(parsed[0].prompt)
        setFrameWork(parsed[0].framework)
        setCode(parsed[0].code)
        setOutputScreen(true)
      }
    }

    const savedFont = localStorage.getItem("editor-font-size")
    if (savedFont) setEditorFontSize(Number(savedFont))

    const savedComments = localStorage.getItem("include-comments")
    if (savedComments !== null) {
      setIncludeComments(savedComments === "true")
    }
  }, [])

  /* ===================== SAVE SETTINGS ===================== */
  useEffect(() => {
    localStorage.setItem("editor-font-size", editorFontSize)
  }, [editorFontSize])

  useEffect(() => {
    localStorage.setItem("include-comments", includeComments)
  }, [includeComments])

  /* ===================== HELPERS ===================== */
  const extractCode = (response) => {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/)
    return match ? match[1].trim() : response.trim()
  }

  /* ===================== GEMINI ===================== */
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
  })

  /* ===================== GENERATE CODE ===================== */
  const getResponse = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe your component first")
      return
    }

    try {
      setLoading(true)

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
        You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.
        
        Now, generate a UI component for: ${prompt}  
        Framework to use: ${frameWork.value}  

        Requirements:  
        - The code must be clean, well-structured, and easy to understand.  
        - Optimize for SEO where applicable.  
        - Focus on creating a modern, animated, and responsive UI design.  
        - Include high-quality hover effects, shadows, animations, colors, and typography.  
        - Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
        - Do NOT include explanations, text, comments, or anything else besides the code.  
        - And give the whole code in a single HTML file.
        `,
      })

      const generatedCode = extractCode(response.text)
      setCode(generatedCode)
      setOutputScreen(true)

      const newEntry = {
        prompt,
        framework: frameWork,
        code: generatedCode,
        createdAt: Date.now()
      }

      const updatedHistory = [newEntry, ...history].slice(0, 5)
      setHistory(updatedHistory)
      localStorage.setItem("componentai-history", JSON.stringify(updatedHistory))

    } catch (err) {
      console.error(err)
      toast.error("Failed to generate code")
    } finally {
      setLoading(false)
    }
  }

  /* ===================== ACTIONS ===================== */
  const copyCode = async () => {
    if (!code) return
    await navigator.clipboard.writeText(code)
    toast.success("Copied")
  }

  const downloadFile = () => {
    if (!code) return
    const blob = new Blob([code], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ComponentAI.html"
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("componentai-history")
    toast.success("History cleared")
  }

  /* ===================== REACT SELECT STYLES ===================== */
  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "var(--tertiary-bg)",
      borderColor: "var(--border-color)",
      boxShadow: "none",
      color: "var(--text-primary)"
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--secondary-bg)"
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--primary-600)"
        : state.isFocused
        ? "var(--tertiary-bg)"
        : "var(--secondary-bg)",
      color: state.isSelected ? "#fff" : "var(--text-primary)"
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--text-primary)"
    }),
    input: (base) => ({
      ...base,
      color: "var(--text-primary)"
    })
  }

  /* ===================== RENDER ===================== */
  return (
    <>
      <Navbar
        theme={theme}
        setTheme={setTheme}
        historyCount={history.length}
        lastUsed={history[0]?.createdAt}
        clearHistory={clearHistory}
        editorFontSize={editorFontSize}
        setEditorFontSize={setEditorFontSize}
        includeComments={includeComments}
        setIncludeComments={setIncludeComments}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 lg:px-16">

        {/* LEFT */}
        <div className="bg-[var(--secondary-bg)] p-5 rounded-xl mt-5">
          <h3 className="text-xl font-bold sp-text">AI Component Generator</h3>

          <p className="mt-4 font-semibold">Framework</p>
          <Select
            options={options}
            value={frameWork}
            onChange={setFrameWork}
            styles={selectStyles}
          />

          <p className="mt-4 font-semibold">Describe Component</p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full mt-2 min-h-[180px] bg-[var(--tertiary-bg)] p-3 rounded-lg"
          />

          <button
            onClick={getResponse}
            className="mt-4 w-full flex justify-center items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-600)] text-white"
          >
            {loading ? <ClipLoader size={18} color="white" /> : <BsStars />}
            Generate
          </button>
        </div>

        {/* RIGHT */}
        <div className="bg-[var(--secondary-bg)] rounded-xl mt-5 h-[80vh] overflow-hidden">
          {!outputScreen ? (
            <div className="h-full flex flex-col items-center justify-center">
              <HiOutlineCode size={40} />
              <p className="mt-3 text-gray-400">Output will appear here</p>
            </div>
          ) : (
            <>
              <div className="flex">
                <button
                  onClick={() => setTab(1)}
                  className={`w-1/2 p-2 ${tab === 1 ? "bg-[var(--primary-600)] text-white" : "bg-[var(--tertiary-bg)]"}`}
                >
                  Code
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`w-1/2 p-2 ${tab === 2 ? "bg-[var(--primary-600)] text-white" : "bg-[var(--tertiary-bg)]"}`}
                >
                  Preview
                </button>
              </div>

              <div className="flex justify-end gap-2 p-2 bg-[var(--tertiary-bg)]">
                {tab === 1 ? (
                  <>
                    <button onClick={copyCode}><IoCopy /></button>
                    <button onClick={downloadFile}><PiExportBold /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setIsNewTabOpen(true)}><ImNewTab /></button>
                    <button onClick={() => setRefreshKey(k => k + 1)}><FiRefreshCcw /></button>
                  </>
                )}
              </div>

              {tab === 1 ? (
                <Editor
                  value={code}
                  height="100%"
                  language="html"
                  theme={theme === "dark" ? "vs-dark" : "light"}
                  options={{ fontSize: editorFontSize }}
                />
              ) : (
                <iframe
                  key={refreshKey}
                  srcDoc={code}
                  sandbox="allow-scripts allow-forms"
                  className="w-full h-full bg-white"
                />
              )}
            </>
          )}
        </div>
      </div>

      {isNewTabOpen && (
        <div className="fixed inset-0 bg-[var(--primary-bg)]">
          <div className="flex justify-between p-4 bg-[var(--tertiary-bg)]">
            <p className="font-bold">Preview</p>
            <button onClick={() => setIsNewTabOpen(false)}>
              <IoCloseSharp />
            </button>
          </div>
          <iframe
            srcDoc={code}
            sandbox="allow-scripts allow-forms"
            className="w-full h-[calc(100vh-60px)] bg-white"
          />
        </div>
      )}
    </>
  )
}

export default Home
