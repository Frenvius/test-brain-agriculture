export interface Props {
	params: ProducerPage;
	searchParams?: { [key: string]: string | undefined };
}

export interface ProducerPage {
	query: string;
	locale: string;
}
