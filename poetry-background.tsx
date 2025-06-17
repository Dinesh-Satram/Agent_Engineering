"use client"

import { useState, useEffect } from "react"

export default function Component() {
  const [generatedPoem, setGeneratedPoem] = useState({
    title: "Whispers of Dawn",
    lines: [
      "In gardens where the moonlight weaves,",
      "Through silver threads of whispered dreams,",
      "The heart finds what the soul believes,",
      "In poetry's eternal streams.",
    ],
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [theme, setTheme] = useState("")
  const [style, setStyle] = useState("free-verse")
  const [mood, setMood] = useState("romantic")
  const [particles, setParticles] = useState<{left: string, top: string, delay: string, duration: string}[]>([])

  const poemCollection = [
    {
      title: "Whispers of Dawn",
      lines: [
        "In gardens where the moonlight weaves,",
        "Through silver threads of whispered dreams,",
        "The heart finds what the soul believes,",
        "In poetry's eternal streams.",
      ],
    },
    {
      title: "Ocean's Song",
      lines: [
        "Waves crash upon the weathered shore,",
        "Each drop a story, ancient lore,",
        "The sea remembers what came before,",
        "And sings of love forevermore.",
      ],
    },
    {
      title: "Mountain's Embrace",
      lines: [
        "Silent peaks touch the endless sky,",
        "Where eagles soar and spirits fly,",
        "In solitude, the heart learns why",
        "Some truths are found when we reach high.",
      ],
    },
    {
      title: "Autumn's Dance",
      lines: [
        "Golden leaves spiral down with grace,",
        "Time's gentle hand shows on each face,",
        "In letting go, we find our place,",
        "And beauty blooms in empty space.",
      ],
    },
    {
      title: "City Lights",
      lines: [
        "Neon dreams paint the midnight air,",
        "Stories unfold everywhere,",
        "In crowded streets, souls learn to share",
        "The poetry of being there.",
      ],
    },
    {
      title: "Desert Wind",
      lines: [
        "Across the dunes, the wind tells tales,",
        "Of ancient paths and forgotten trails,",
        "Where silence speaks and never fails",
        "To heal the heart when daylight pales.",
      ],
    },
    {
      title: "Forest Deep",
      lines: [
        "Among the trees where shadows play,",
        "Old wisdom grows in bark and clay,",
        "The forest knows what words can't say,",
        "And guides lost souls to find their way.",
      ],
    },
    {
      title: "Starlit Night",
      lines: [
        "Constellations write their names in light,",
        "Across the canvas of the night,",
        "Each star a dream burning bright,",
        "Inspiring hearts to take their flight.",
      ],
    },
  ]

  const generatePoem = async () => {
    setIsGenerating(true)
    const prompt = `Write a ${style} poem about "${theme}" in a ${mood} mood. Give it a title and four lines.`
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "user", content: prompt },
          ],
        }),
      })
      if (!response.ok) throw new Error("Failed to generate poem")

      // Instead of streaming, just get the full text response
      const result = await response.text()
      console.log("AI raw result (text):", result)

      // Extract all 0:"..." lines and concatenate their contents
      const poemText = Array.from(result.matchAll(/0:"([^"]*)"/g))
        .map(match => match[1])
        .join("")

      // Now parse the poemText as before
      let poemLines = poemText
        .replace(/[*_`#>]/g, "")
        .split("\n")
        .map(l => l.trim())
        .filter(Boolean)
      let title = "Generated Poem"
      if (poemLines.length > 1 && poemLines[0].length < 80) {
        title = poemLines[0].replace(/^['"]|['"]$/g, "").replace(/[:\-]+$/, "").trim()
        poemLines = poemLines.slice(1)
      }
      setGeneratedPoem({ title, lines: poemLines.length ? poemLines : [poemText || "No poem generated."] })
    } catch (e) {
      setGeneratedPoem({ title: "Error", lines: ["Could not generate poem."] })
      console.error(e)
    }
    setIsGenerating(false)
  }

  useEffect(() => {
    const arr = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`,
    }));
    setParticles(arr);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated floating words */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-white/10 text-6xl font-serif animate-pulse">verse</div>
        <div className="absolute top-40 right-20 text-white/10 text-4xl font-serif animate-pulse delay-1000">rhyme</div>
        <div className="absolute bottom-40 left-20 text-white/10 text-5xl font-serif animate-pulse delay-2000">
          stanza
        </div>
        <div className="absolute bottom-20 right-10 text-white/10 text-3xl font-serif animate-pulse delay-3000">
          metaphor
        </div>
        <div className="absolute top-60 left-1/2 text-white/10 text-4xl font-serif animate-pulse delay-500">sonnet</div>
      </div>

      {/* Animated ink drops */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-400/30 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-400/30 rounded-full animate-ping delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-indigo-400/30 rounded-full animate-ping delay-3000"></div>
      </div>

      {/* Quill pen illustration */}
      <div className="absolute top-10 right-10 opacity-20">
        <svg width="120" height="120" viewBox="0 0 120 120" className="text-white">
          <path
            d="M20 100 L40 20 L45 15 L50 20 L55 25 L60 30 L65 35 L70 40 L75 45 L80 50 L85 55 L90 60 L95 65 L100 70 L30 105 Z"
            fill="currentColor"
            className="animate-pulse"
          />
          <circle cx="25" cy="105" r="3" fill="currentColor" />
        </svg>
      </div>

      {/* Decorative scroll */}
      <div className="absolute bottom-10 left-10 opacity-20">
        <svg width="100" height="80" viewBox="0 0 100 80" className="text-white">
          <path
            d="M10 10 Q10 5 15 5 L85 5 Q90 5 90 10 L90 70 Q90 75 85 75 L15 75 Q10 75 10 70 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-pulse"
          />
          <line x1="20" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="40" x2="75" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-4xl w-full">
          {/* Poetry Generator Interface */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-serif text-white mb-4 tracking-wide">Poetry Generator</h1>
            <p className="text-xl text-purple-200 font-light">Transform your thoughts into beautiful verses</p>
          </div>

          {/* Input Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-white text-lg font-medium mb-3">
                  What would you like your poem to be about?
                </label>
                <textarea
                  className="w-full h-32 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none backdrop-blur-sm"
                  placeholder="Enter your theme, emotion, or inspiration..."
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Poetry Style</label>
                  <select
                    className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                  >
                    <option value="free-verse">Free Verse</option>
                    <option value="sonnet">Sonnet</option>
                    <option value="haiku">Haiku</option>
                    <option value="limerick">Limerick</option>
                    <option value="ballad">Ballad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Mood</label>
                  <select
                    className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                  >
                    <option value="romantic">Romantic</option>
                    <option value="melancholic">Melancholic</option>
                    <option value="joyful">Joyful</option>
                    <option value="mysterious">Mysterious</option>
                    <option value="inspirational">Inspirational</option>
                  </select>
                </div>
              </div>

              <button
                onClick={generatePoem}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Crafting your poem...
                  </span>
                ) : (
                  "Generate Poetry ✨"
                )}
              </button>
            </div>
          </div>

          {/* Sample Generated Poem */}
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-serif text-white mb-6 text-center">{generatedPoem.title}</h3>
            <div className="text-center space-y-4">
              <div className="text-purple-200 font-serif text-lg leading-relaxed">
                {generatedPoem.lines.map((line, index) => (
                  <p key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.3}s` }}>
                    {line}
                  </p>
                ))}
              </div>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(`${generatedPoem.title}\n\n${generatedPoem.lines.join("\n")}`)
                  }
                  className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200"
                >
                  Copy Poem
                </button>
                <button className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200">
                  Share
                </button>
                <button className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle particle effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
