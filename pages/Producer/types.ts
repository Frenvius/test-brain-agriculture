export interface DataType {
	id: string;
	name: string;
	farm: Farm;
}

export interface Farm {
	name: string;
	city: string;
	state: string;
	area: number;
	usefulArea: number;
	vegetationArea: number;
	plantedCrops: string[];
}
