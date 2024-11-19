export interface Menu {
	id: string;
	name: string;
	entrepreneurId: string;
	createdAt: Date;
	updatedAt: Date;
}
export interface CreateMenuRequest {
	name: string;
	entrepreneurId: string;
}
