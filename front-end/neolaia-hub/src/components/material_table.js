import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv'; 
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

const MaterialTable = ({columns_value, data_table}) => {
    const navigate = useNavigate();
  //should be memoized or stable
  const columns = useMemo(
    () => columns_value,
    [columns_value],
  );
  const data = data_table;

    const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const handleRowClick = (row,event) => {
    //navigate('/researcher-page', { state: { researcher_id: row.original.id } });
    console.log(event.target.innerHTML)
    if(!event.target.innerHTML.includes('.')){
        const url = `./researcher-page?researcher_id=${row.original.id}`;
        window.open(url, '_blank');
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { pagination: { pageSize: 30, pageIndex: 0 } },

    renderTopToolbarCustomActions: ({ table }) => (
        
      <Box
        sx={{
            display: 'flex',
            gap: '16px',
          padding: '8px',
            flexWrap: 'wrap',
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
      </Box>
    ),

    initialState: { columnVisibility: { id: false } },

        muiTableBodyRowProps: ({row, staticRowIndex, table}) => ({
            onClick: (event) => {
                handleRowClick(row,event)
            },
            sx: {
              cursor: 'pointer',
            },
          }),
  });

  return <MaterialReactTable table={table}/>;
};

export default MaterialTable;
