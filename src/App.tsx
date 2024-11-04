import React, { useState } from "react";
import { calculate } from "./calcFuncs";
import { Button, Input, Tour, Card, Modal } from "antd";
import "antd/dist/reset.css"; // Ant Design styling reset
import exampleImg from "./Assets/delimitereg.png";
const { TextArea } = Input;


// Core string calculator logic

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<number | string>(0);
  const [error, setError] = useState<string | null>(null);
  const [tourVisible, setTourVisible] = useState(true);

  const handleCalculate = () => {
    try {
      setError(null); // Reset error state before calculation
      const sum = calculate(inputValue);
      setResult(sum);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        showErrorModal(e.message);
      }
    }
  };

  const showErrorModal = (errorMessage: string) => {
    Modal.error({
      title: "Error",
      content: <div style={{ color: "red" }}>{errorMessage}</div>,
      okText: "OK",
    });
  };

  // Ant Design Tour steps
  const steps = [
    {
      title: "Input Numbers",
      description: "Enter numbers separated by commas or new lines.",
      target: () => document.querySelector(".number-input") as HTMLElement,
    },
    {
      title: "Add Custom Delimiter",
      description: (
        <div style={{ maxWidth: "300px", margin: "0 auto" }}>
          <p>
            To add a custom delimiter, start with "//[delimiter]\\n[numbers]"
          </p>
          <img
            src={exampleImg}
            alt="Custom Delimiter Example"
            style={{ width: "100%", maxWidth: "300px", marginTop: ".5rem" }} // Adjust styles as needed
          />
        </div>
      ),
      target: () => document.querySelector(".number-input") as HTMLElement,
    },
    {
      title: "Calculate Result",
      description: 'Click the "Calculate" button to get the sum.',
      target: () => document.querySelector(".calculate-button") as HTMLElement,
    },
    {
      title: "See the Result",
      description: "The result will be displayed here.",
      target: () => document.querySelector(".result-box") as HTMLElement,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        fontFamily: "Arial",
        flexDirection: "column",
        padding: "0 20px",
      }}
    >
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>SimpleCalc</h1>
      <Card style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
        <TextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter numbers (comma-separated or new line)"
          className="number-input"
          autoSize={{ minRows: 3, maxRows: 5 }}
          style={{ marginBottom: "20px" }}
        />

        <Button
          type="primary"
          onClick={handleCalculate}
          className="calculate-button"
          style={{ marginBottom: "20px", width: "100%" }}
        >
          Calculate
        </Button>

        <Input
          value={error ? 0 : result}
          className="result-box"
          disabled
          style={{ marginBottom: "20px", color: "#52c41a", fontSize: "2rem" }}
        />
        {/* { error? <p style={{color:"#da2525"}}>{error}</p> : <></>} */}

        <Button
          type="dashed"
          onClick={() => setTourVisible(true)}
          style={{ width: "100%" }}
        >
          Show Tour
        </Button>

        <Tour
          open={tourVisible}
          onClose={() => setTourVisible(false)}
          steps={steps}
        />
      </Card>
    </div>
  );
};

export default App;
