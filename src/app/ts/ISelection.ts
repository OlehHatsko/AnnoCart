import { InfoBlockComponent } from "../info-block/info-block.component";
import { IShowable } from "./IShowable";
import { SelectionType } from "./SelectionType";

export interface ISelection extends IShowable {
	initialPoint: {
		pointX: number;
		pointY: number;
	  }
	  
	isShowAllEnabled: boolean;
	id: number;
	selectionType: SelectionType;
	infoBlock: InfoBlockComponent;
}