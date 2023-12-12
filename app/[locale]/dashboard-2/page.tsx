import Dashboard2 from '~/components/pages/Dashboard-2';
import { dashboardService } from '~/app/usecase/service/dashboard/service';

const DashboardPage = async () => {
	const data = await dashboardService.get();
	return <Dashboard2 data={data} />;
};

export default DashboardPage;
