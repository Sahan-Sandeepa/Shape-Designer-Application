import { useState, useEffect, useRef } from "react";

const App = () => {
  const [shapeType, setShapeType] = useState("RECTANGLE");
  const [dimensions, setDimensions] = useState({});
  const [area, setArea] = useState(0);
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const canvasRef = useRef(null);

  // Load shapes from backend
  useEffect(() => {
    fetchShapes();
  }, []);

  const fetchShapes = async () => {
    const response = await fetch("http://localhost:8080/api/shapes");
    const data = await response.json();
    setShapes(data);
  };

  // Default dimensions
  useEffect(() => {
    if (shapeType === "RECTANGLE") {
      setDimensions({ width: 100, height: 100 });
    } else if (shapeType === "CIRCLE") {
      setDimensions({ radius: 50 });
    } else if (shapeType === "TRIANGLE") {
      setDimensions({ base: 100, height: 80 });
    }
  }, [shapeType]);

  useEffect(() => {
    drawShape();
    calculateArea();
  }, [dimensions]);

  const drawShape = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    if (shapeType === "RECTANGLE") {
      ctx.rect(50, 50, dimensions.width || 0, dimensions.height || 0);
    }

    if (shapeType === "CIRCLE") {
      ctx.arc(150, 150, dimensions.radius || 0, 0, 2 * Math.PI);
    }

    if (shapeType === "TRIANGLE") {
      ctx.moveTo(50, 200);
      ctx.lineTo(50 + (dimensions.base || 0), 200);
      ctx.lineTo(50, 200 - (dimensions.height || 0));
      ctx.closePath();
    }

    ctx.stroke();
  };

  const calculateArea = () => {
    let result = 0;

    if (shapeType === "RECTANGLE") {
      result = (dimensions.width || 0) * (dimensions.height || 0);
    }

    if (shapeType === "CIRCLE") {
      result = Math.PI * Math.pow(dimensions.radius || 0, 2);
    }

    if (shapeType === "TRIANGLE") {
      result = 0.5 * (dimensions.base || 0) * (dimensions.height || 0);
    }

    setArea(result.toFixed(2));
  };

  const handleChange = (e) => {
    setDimensions({
      ...dimensions,
      [e.target.name]: Number(e.target.value),
    });
  };

  const saveShape = async () => {
    const shapeData = {
      name: "Custom " + shapeType,
      type: shapeType,
      dimensionData: JSON.stringify(dimensions),
    };

    if (selectedId) {
      await fetch(`http://localhost:8080/api/shapes/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shapeData),
      });
    } else {
      await fetch("http://localhost:8080/api/shapes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shapeData),
      });
    }

    fetchShapes();
    setSelectedId(null);
  };

  const editShape = (shape) => {
    setSelectedId(shape.id);
    setShapeType(shape.type);
    setDimensions(JSON.parse(shape.dimensionData));
  };

  const deleteShape = async (id) => {
    await fetch(`http://localhost:8080/api/shapes/${id}`, {
      method: "DELETE",
    });
    fetchShapes();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shape Designer</h2>

      <label>Select Shape: </label>
      <select value={shapeType} onChange={(e) => setShapeType(e.target.value)}>
        <option value="RECTANGLE">Rectangle</option>
        <option value="CIRCLE">Circle</option>
        <option value="TRIANGLE">Triangle</option>
      </select>

      <div style={{ marginTop: "20px" }}>
        {shapeType === "RECTANGLE" && (
          <>
            <input
              type="number"
              name="width"
              value={dimensions.width || ""}
              onChange={handleChange}
            />
            <input
              type="number"
              name="height"
              value={dimensions.height || ""}
              onChange={handleChange}
            />
          </>
        )}

        {shapeType === "CIRCLE" && (
          <input
            type="number"
            name="radius"
            value={dimensions.radius || ""}
            onChange={handleChange}
          />
        )}

        {shapeType === "TRIANGLE" && (
          <>
            <input
              type="number"
              name="base"
              value={dimensions.base || ""}
              onChange={handleChange}
            />
            <input
              type="number"
              name="height"
              value={dimensions.height || ""}
              onChange={handleChange}
            />
          </>
        )}
      </div>

      <h3>Calculated Area: {area}</h3>

      <button onClick={saveShape} style={{ marginTop: "10px" }}>
        {selectedId ? "Update Shape" : "Save Shape"}
      </button>

      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        style={{ border: "1px solid black", marginTop: "20px" }}
      ></canvas>

      <h3>Saved Shapes</h3>
      <ul>
        {shapes.map((shape) => (
          <li key={shape.id}>
            {shape.name} ({shape.type})
            <button onClick={() => editShape(shape)}> Edit </button>
            <button onClick={() => deleteShape(shape.id)}> Delete </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
