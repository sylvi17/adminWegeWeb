import * as XLSX from "xlsx";

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, {
          type: "array",
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const json = XLSX.utils.sheet_to_json(sheet);

        resolve(json);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject("Gagal membaca file");

    reader.readAsArrayBuffer(file);
  });
};
