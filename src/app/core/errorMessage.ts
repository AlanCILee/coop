import { Component } from '@angular/core';

@Component({
	selector: 'app-error-message',
	templateUrl: `
<div *ngIf="ErrorMessageIsVisible" class="modal fade show in danger" id="myModal" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Error</h4>
			</div>
			<div class="modal-body">
				<p>{{ErrorMsg}}</p>
			</div>
			<div class="modal-footer">
			<button type="button" class="btn btn-default" (click)="hideErrorMsg()">Close</button>
			</div>
		</div>
	</div>
</div>`,
})

export class ErrorMessage
{
	private ErrorMsg: string;
	public ErrorMessageIsVisible: boolean;
	
	showErrorMessage(msg: string)
	{
		this.ErrorMsg = msg;
		this.ErrorMessageIsVisible = true;
	}
	
	hideErrorMsg()
	{
		this.ErrorMessageIsVisible = false;
	}
}