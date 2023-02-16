import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfViewer {
  path?: string
}

const PdfViewer = ({ path }: PdfViewer) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        'zIndex': 1,
        'backgroundColor': '#fff',
        'width': '100%'
      }}
    >
      <Document file={eventId && path ? `${path}` : './../files/sample-pdf-with-images.pdf'} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <Box sx={{ 'textAlign': 'center', 'marginBottom': 5 }}>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <Button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
          variant="contained"
          size="small"
          sx={{ 'marginRight': 2 }}
          // color="neutral"
        >
          Previous
        </Button>
        <Button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
          variant="contained"
          size="small"
          // color="neutral"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PdfViewer;
