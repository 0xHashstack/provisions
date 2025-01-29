import { StaticImageData } from 'next/image';

export type ProvisionCategory = {
	ticketId: number;
	id: string;
	claimableAmount: number;
	currentClaimableAmount: number;
	EmissionRate: number;
	ticketType: number;
	description: string;
	icon: StaticImageData;
};
