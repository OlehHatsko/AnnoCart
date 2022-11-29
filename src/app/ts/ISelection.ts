import { InfoBlockComponent } from "../info-block/info-block.component";
import { IShowable } from "./IShowable";
import { SelectionType } from "./SelectionType";

export interface ISelection extends IShowable {
	isShowAllEnabled: boolean;
	id: number;
	selectionType: SelectionType;
	infoBlock: InfoBlockComponent;
}