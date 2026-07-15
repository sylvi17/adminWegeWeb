import { useState } from "react";
import { readExcelFile } from "../utils/excelReader";

export default function ImportExcel() {
  const [excelData, setExcelData] = useState([]);

  const handleFile = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const data = await readExcelFile(file);

    console.log(data);

    setExcelData(data);
  };

  return (
    <div>
      <input type="file" accept=".xlsx,.xls" onChange={handleFile} />

      <p>Total Data : {excelData.length}</p>
    </div>
  );
}
