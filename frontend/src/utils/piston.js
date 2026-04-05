// Judge0 CE Public API (The most popular open-source alternative to Piston)
const JUDGE0_API = "https://ce.judge0.com";

// Judge0 requires numeric IDs for languages rather than strings
const LANGUAGE_VERSIONS = {
  javascript: { id: 93 }, // Node.js 18.15.0
  python: { id: 71 },     // Python 3.10.1
  java: { id: 62 },       // Java 13.0.1
  cpp: { id: 54 }, // <-- Add this line for C++
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    // `wait=true` ensures the API doesn't just return a token, but waits for execution to finish
    // `base64_encoded=false` allows us to send raw string data
    const response = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language_id: languageConfig.id,
        source_code: code,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    // Judge0 returns standard output in `stdout` and errors in `stderr` or `compile_output`
    const output = data.stdout || "";
    const stderr = data.stderr || data.compile_output || data.message || "";

    // Judge0 status ID 3 means "Accepted" (Successful execution)
    // Anything else means a compilation, runtime, or timeout error occurred
    if (data.status?.id !== 3 || stderr) {
      return {
        success: false,
        output: output,
        error: stderr || `Execution Error: ${data.status?.description}`,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}