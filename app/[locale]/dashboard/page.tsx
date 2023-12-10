import Dashboard from '../../../components/pages/Dashboard';
import { dashboardService } from '~/app/usecase/service/dashboard/service';

const DashboardPage = async () => {
	const data = await dashboardService.get();
	return <Dashboard data={data} />;
};

export default DashboardPage;
