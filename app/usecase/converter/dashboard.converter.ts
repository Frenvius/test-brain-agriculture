import { ChartItem } from '~/app/domain/response/DashboardResponse';

class DashboardConverter {
	translatedCropData(t: any, data: ChartItem[]): ChartItem[] {
		return data.map((item) => {
			return {
				label: t(item.label.toLowerCase()),
				value: item.value
			};
		});
	}

	translatedAreaData(t: any, data: ChartItem[]): ChartItem[] {
		return data.map((item) => {
			return {
				label: t(`${item.label}`),
				value: item.value
			};
		});
	}
}

export const dashboardConverter = new DashboardConverter();
