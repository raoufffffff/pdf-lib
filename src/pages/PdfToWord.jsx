import { useState } from "react";
import { PDFDocument } from 'pdf-lib';
import { Document, Packer, Paragraph } from 'docx';

const PdfToWord = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            // Read the PDF file
            const arrayBuffer = await selectedFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            // Extract text from each page
            const pages = pdfDoc.getPages();
            const textArray = await Promise.all(
                pages.map(async (page) => {
                    const textContent = await page.getTextContent();
                    return textContent.items.map((item) => item.str).join(' ');
                })
            );

            const fullText = textArray.join('\n\n');

            // Create a Word document
            const doc = new Document();
            doc.addSection({
                properties: {},
                children: [new Paragraph(fullText)],
            });

            // Generate the Word file
            const packer = new Packer();
            const blob = await packer.toBlob(doc);

            // Create a download link for the Word file
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'converted.docx';
            link.click();
        }
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Convert PDF to Word</button>
        </div>
    );
};

export default PdfToWord