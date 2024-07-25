import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { CiCircleRemove } from 'react-icons/ci';
import { motion } from 'framer-motion';

const MergeMultiplePDFs = () => {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
    const [name, setname] = useState("")
    const [show, setshow] = useState(false)
    const hide = () => {
        setshow(false)
    }
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newPdfFiles = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setPdfFiles((prevFiles) => [...prevFiles, ...newPdfFiles]);
    };

    const mergePdfs = async () => {
        const mergedPdf = await PDFDocument.create();

        for (const { file } of pdfFiles) {
            const fileArrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(fileArrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        setMergedPdfUrl(URL.createObjectURL(new Blob([mergedPdfBytes], { type: 'application/pdf' })));
        setshow(true)
    };



    return (
        <div className='flex w-full justify-center flex-col'>
            <h1
                className='text-center text-[#333] font-[600] text-[25px] mt-4 mb-2'
            >Merge PDF files</h1>
            <p
                className='text-[#333a] text-center px-20 mb-5'
            >Combine PDFs in the order you want with the easiest PDF merger available.</p>
            {pdfFiles.length < 1 && <label
                className='cursor-pointer bg-[#e5322d] w-8/12 text-white text-[25px] text-center font-semibold rounded-lg mx-auto mt-5 py-6 '
                htmlFor='pdf' >Select PDF files</label>}
            <input type="file"
                name='pdf'
                id='pdf'
                className='hidden'
                accept="application/pdf" onChange={handleFileChange} />
            <div
                className='flex flex-row-reverse'
            >

                <div className=' flex justify-center fixed right-2 z-50'>
                    {pdfFiles.length > 0 && !show && <label
                        className='cursor-pointer bg-[#e5322d]  h-10 w-10 flex justify-center items-center text-[25px] font-bold text-white rounded-full z-[500] '
                        htmlFor='pdf' >+</label>}
                </div>
                <div
                    className='flex flex-wrap w-full justify-around'
                >
                    {pdfFiles.map((pdfFile, index) => (
                        <div
                            className='bg-white w-[200px] h-[250px] p-10 relative my-2 rounded-2xl'
                            key={index}
                        >
                            <object
                                className='max-w-full h-full overflow-hidden'
                                data={pdfFile.url}
                                type="application/pdf"
                            >

                                <p>Your browser does not support embedded PDFs. You can <a href={pdfFile.url}>download</a>.</p>
                            </object>
                            <div
                                className='absolute top-2 right-3'
                                onClick={() => {
                                    setPdfFiles(pdfFiles.filter(e => e != pdfFile))
                                }}>
                                <CiCircleRemove size={30} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {pdfFiles.length > 1 && <button
                className='cursor-pointer bg-[#e5322d]  text-white text-[25px] text-center font-semibold rounded-lg mx-auto mt-5 py-2 px-9 bottom-2 left-[50%] translate-x-[-50%] fixed'
                onClick={mergePdfs} >
                Merge PDFs
            </button>}
            {show && <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 0.7 }}
                    exit={{ opacity: 0 }}
                    onClick={hide}
                    className='z-40 opacity-30 bg-[#333] fixed w-full h-screen top-0 left-0'
                ></motion.div>
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="fixed left-40 px-7  bg-white w-6/12 flex flex-col py-7 z-[5000] rounded-lg"
                >
                    <input
                        className='px-2 py-1 border border-[#333] rounded-lg mb-5'
                        placeholder='name the marged pdf'
                        value={name} onChange={(e) => setname(e.target.value)} />


                    {mergedPdfUrl && <a
                        className='cursor-pointer bg-[#e5322d]  text-white text-[16px] text-center font-semibold rounded-lg mx-auto  py-2 px-9'
                        onClick={() => {
                            setshow(false)
                            setPdfFiles([])
                        }}
                        href={mergedPdfUrl} download={name ? `${name}.pdf` : "merged.pdf"}>Download Merged PDF</a>}
                </motion.nav>
            </>}
        </div>
    );
};



export default MergeMultiplePDFs;
