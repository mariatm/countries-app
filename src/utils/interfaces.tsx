export interface RegionsSum { 
	[name: string]: number,
};

export interface Regions {
	[key: string]: Country[]
}

export interface Country {
	population: number,
  region: string,
	name: {
		common: string,
	}
}