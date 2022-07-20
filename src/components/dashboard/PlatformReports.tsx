import { useEffect, useState, ReactNode } from 'react';
import {
  Box,
  styled,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from '@mui/material';
import { dynamicChartData, isMonthData } from '../../store/charts';
import StackedBarChart from '../charts/PlatformChart';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataParamType } from '../../types/platform';
import {
  startData,
  endData,
  lastData,
  firstData,
  platformData,
} from '../../store/global';
import {
  parseISO,
  differenceInWeeks,
  getWeekOfMonth,
  add,
  eachDayOfInterval,
  format,
} from 'date-fns';
import { usePlatformModel } from '../../api/models/usePlatformModel';

const PlatformReports = () => {
  const [start, setStart] = useRecoilState(startData);
  const [end, setEnd] = useRecoilState(endData);
  const [last, setLast] = useRecoilState(lastData);
  const [first, setFirst] = useRecoilState(firstData);
  const [dateList, setDateList] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const lastDate = parseISO(last);
  const startDate = parseISO(start);
  const firstDate = parseISO(first);
  const endDate = parseISO(end);
  const [isMonth, setIsMonth] = useRecoilState(isMonthData);
  const d = eachDayOfInterval({
    start: parseISO(start),
    end: parseISO(end),
  });

  const [tableAdData, setTableAdData] = useState<any[]>();
  const { getPlatformTableData } = usePlatformModel();

  useEffect(() => {
    async function fetchAndSetTableData() {
      const response = (await getPlatformTableData(
        parseISO(start),
        d.length,
      ).then(result => result)) as any;

      setTableAdData(response);
    }
    fetchAndSetTableData();
  }, []);

  // TODO: Table Row 하드코딩한 값 변경 (해시로 저장한 후 match되는 값으로 이름 설정)
  return (
    <StyledItem>
      <StackedBarChart />
      <TableContainer sx={{ oveflow: 'scroll', mt: 2 }}>
        <Table
          stickyHeader
          aria-label="simple table"
          sx={{ minWidth: '1200px' }}
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>노출수</TableCell>
              <TableCell>광고단가</TableCell>
              <TableCell>클릭수</TableCell>
              <TableCell>광고수익률</TableCell>
              <TableCell>전환값</TableCell>
              <TableCell>클릭율</TableCell>
              <TableCell>클릭단가</TableCell>
              <TableCell>전환단가</TableCell>
              <TableCell>전환율</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableAdData?.map((table, idx) => {
              const { name, tableData } = table;
              return (
                <TableRow key={`${table}-table-item-${idx}`}>
                  <TableCell>{name}</TableCell>
                  {Object.values(tableData).map((ad: any) => (
                    <TableCell>{ad}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledItem>
  );
};

export default PlatformReports;

const StyledItem = styled(Box)(({ theme }) => ({
  paddingBlock: 30,
  paddingInline: 35,
  [theme.breakpoints.down('md')]: {
    marginTop: 20,
    paddingInline: 16,
  },
  background: '#fff',
  minHeight: 400,
  borderRadius: 5,
}));
