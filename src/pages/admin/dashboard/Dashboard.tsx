import TotalSpent from 'components/sections/total-spent';
// import CardSecurity from 'components/sections/card-security';
// import PiChart from 'components/sections/your-pi-chart';
// import History from 'components/sections/history';
// import Revenue from 'components/sections/revenue';
// import Tasks from 'components/sections/tasks';
// import TeamMembers from 'components/sections/team-members';
// import DailyTraffic from 'components/sections/daily-traffic';
import TopCards from 'components/sections/top-cards';
import Grid from '@mui/material/Grid';
import Calendar from 'components/admin/calendar/index';
// import ComplexTable from 'components/sections/dashboard/complex-table';

const Dashboard = () => {
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <TopCards />
      </Grid>
      <Grid item xs={12} md={4}>
        <Calendar />
      </Grid>
      <Grid item xs={12} md={8}>
        <TotalSpent />
      </Grid>
      {/* <Grid item xs={12} md={6} lg={4} xl={3}>
        <Revenue />
      </Grid> */}
      {/* <Grid item xs={12} md={6} lg={4} xl={3}>
        <Tasks />
      </Grid> */}
      {/* <Grid item xs={12} md={6} lg={4} xl={3}>
        <DailyTraffic />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <PiChart />
      </Grid> */}
      {/* <Grid item xs={12} md={6} lg={4} xl={3}>
        <History />
      </Grid> */}
      {/* <Grid item xs={12} md={6} lg={4} xl={3}>
        <Calendar />
      </Grid> */}
      {/* <Grid item xs={12} md={6} lg={4} xl={3}>
        <BusinessDesign />
      </Grid> */}
      {/* <Grid item xs={12} md={6} lg={4} xl={3}>
        <TeamMembers />
      </Grid> */}
      {/* <Grid item xs={12} lg={8} xl={6}>
        <ComplexTable />
      </Grid> */}
    </Grid>
  );
};

export default Dashboard;
