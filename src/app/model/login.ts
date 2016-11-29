import { Injectable } from "@angular/core";

@Injectable()
export class LogIn {
	currentUser: string = null;
	currentCompany: string = null;

	setCurrentUser(name: string) {
		this.currentUser = name;
	}
	getCurrentUser(): string {
		return this.currentUser;
	}
	setCurrentCompany(name: string) {
		this.currentCompany = name;
	}
	getCurrentCompany() {
		return this.currentCompany;
	}
}