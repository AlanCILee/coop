import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mapToIterable',
	pure: false
})
export class MapToIterable implements PipeTransform {
	transform(map: {}, args: any[] = null): any {
		if (!map)
			return null;
		return Object.keys(map)
			.map((key) => ({ 'key': key, 'val': map[key] }));
	}
}