import { BarChart } from '@mantine/charts';
import DetailsData from '../types/Company';

const FinancialStats = (info: any) => {

    const relevantStats = ['circa_rating', 'ffo_to_debt_ltm', 'debt_to_ebitda_ltm', 'cfo_to_debt_ltm', 'focf_to_debt_ltm', 'dcf_to_debt_ltm', 'ffo_interest_coverage_ltm', 'ebitda_to_interest_ltm', 'ebit_margin_ltm', 'ebitda_margin_ltm', 'return_on_capital_ltm']
    
    const data = relevantStats.map((stat: string) => ({name: stat.replace('-', ' '), stat, val: info.detailsData[stat]}))

  return (
    <BarChart
      h={200}
      data={data}
      dataKey="name"
      orientation="vertical"
      yAxisProps={{ width: 80 }}
      barProps={{ radius: 10 }}
      series={[{ name: 'val', color: 'blue.6' }]}
    />
  );
}

export default FinancialStats;