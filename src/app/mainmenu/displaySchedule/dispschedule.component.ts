import { Component, Input, OnInit }  from '@angular/core';
import { Job } from "../../model/schedule";
import { Department, Departments } from "../../model/department";

declare var Snap: any;// = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );

@Component({
	selector: 'schedule',
	templateUrl: './dispschedule.component.html'
})

export class DispScheduleComponent implements OnInit {
	snapSvgElement: any;

	@Input() departJobs: Job[];
	@Input() department: string;

	constructor(private departments: Departments) {
	}

	ngOnInit() {
		Snap = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );
		this.createInitiativeBg();

	}

	createInitiativeBg(): void {

		let initiativeSvg = Snap('#initiativeSvg'),
			width = initiativeSvg.node.clientWidth,
			height = initiativeSvg.node.clientHeight,
			bandHeight = (height / 4.95),
			textOffsetY = bandHeight / 1.7,
			label = 1;

		var initiativeSvgBg = [
			{y: (bandHeight * 4) + textOffsetY},
			{y: (bandHeight * 3) + textOffsetY},
			{y: (bandHeight * 2) + textOffsetY},
			{y: bandHeight + textOffsetY},
			{y: textOffsetY}
		];


		//x,y,w,h
		initiativeSvg.rect(0, 0, width, height).attr({fill: '#ababab'});
		//x1,y1,x2,y2
		initiativeSvg.line(width / 2, 0, width / 2, height).attr({stroke: '#fff'});
		initiativeSvg.line(width * .05, height / 2, width, height / 2).attr({stroke: '#fff'});

		initiativeSvgBg.forEach(function (item) {
			initiativeSvg.text(width * .02, item.y, label).attr({
				font: "100 1.8em Source Sans Pro",
				textAnchor: "middle",
				fill: "#FFF"
			});
			label++;
		});
		this.snapSvgElement = initiativeSvg;
		//container.appendChild(document.getElementById('initiativeSvg'));

	}

}