import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { PROBLEMS } from "../data/problems";
import NavBar from "../components/NavBar";
import ProblemDescription from "../components/ProblemDescription";
import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { executeCode } from '../utils/piston.js'
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

const ProblemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const currentProblem = PROBLEMS[currentProblemId];

    useEffect(() => {
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id);
            setCode(PROBLEMS[id].starterCode[selectedLanguage]);
            setOutput(null);
        }
    }, [id, selectedLanguage]);

    const normalizeOutput = (output) => {
        // normalize output for comparison (trim whitespace, handle different spacing)
        return output
            .trim()
            .split("\n")
            .map((line) =>
                line
                    .trim()
                    // remove spaces after [ and before ]
                    .replace(/\[\s+/g, "[")
                    .replace(/\s+\]/g, "]")
                    // normalize spaces around commas to single space after comma
                    .replace(/\s*,\s*/g, ",")
            )
            .filter((line) => line.length > 0)
            .join("\n");
    };
    const checkIfTestsPassed = (actual, expected) => {
        const normalized = normalizeOutput(actual);
        const normalizedExp = normalizeOutput(expected);
        return normalized === normalizedExp;
    }

    const handleLanguageChange = (event) => {
        const newLang = event.target.value;
        setSelectedLanguage(newLang);
        setCode(currentProblem.starterCode[newLang])
        setOutput(null)
    }

    const handleProblemChange = (newProblemId) => navigate(`/problem/${newProblemId}`);


    const triggerConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.2, y: 0.6 },
        });

        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.8, y: 0.6 },
        });
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);
        const result = await executeCode(selectedLanguage, code);
        console.log(result);
        setOutput(result);
        setIsRunning(false);

        if (result.success) {
            const expected = currentProblem.expectedOutput[selectedLanguage];
            const passed = checkIfTestsPassed(result.output, expected);
            if (passed) {
                triggerConfetti();
                toast.success("All tests passed");
            } else {
                toast.error("Tests failed");
            }
        }
    }


    return (
        <div className="h-screen w-screen bg-base-100 flex flex-col">
            <NavBar />
            <div className="flex-1">
                <PanelGroup direction="horizontal">
                    <Panel defaultSize={40} minSize={20}>
                        <ProblemDescription
                            problem={currentProblem}
                            currentProblemId={currentProblemId}
                            onProblemChange={handleProblemChange}
                            allProblems={Object.values(PROBLEMS)}
                        />
                    </Panel>

                    <PanelResizeHandle className='w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize'></PanelResizeHandle>

                    <Panel defaultSize={60} minSize={20}>
                        <PanelGroup direction="vertical">
                            <Panel defaultSize={30} minSize={30}>
                                <CodeEditor
                                    selectedLanguage={selectedLanguage}
                                    isRunning={isRunning}
                                    code={code}
                                    onLanguageChange={handleLanguageChange}
                                    onCodeChange={setCode}
                                    onRunCode={handleRunCode}
                                ></CodeEditor>
                            </Panel>

                            <PanelResizeHandle className='h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize'></PanelResizeHandle>

                            <Panel defaultSize={50} minSize={30}>
                                <OutputPanel
                                output={output}
                                />
                            </Panel>
                        </PanelGroup>
                    </Panel>

                </PanelGroup>
            </div>
        </div>
    )
}

export default ProblemPage
