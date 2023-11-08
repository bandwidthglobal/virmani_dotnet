import { FlatTreeControl, NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource } from "@angular/material/tree";
import { Component, Input, Output, OnInit, ViewEncapsulation, EventEmitter } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-hot-code-menu',
    templateUrl: './hot-code-menu.component.html',
    styleUrls: ['./hot-code-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    // imports: [MatIconModule]
})

export class HotCodeMenuComponent implements OnInit {


    @Input() DiagnosisData: any = '';
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();

    private _transformer = (node: any, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            category: node.category,
            id: node.id,
            parent:node.parent,
            level: level,
        };
    };

    treeControl = new FlatTreeControl<any>(
        node => node.level,
        node => node.expandable,
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children,
    );
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor() { }

    ngOnInit(): void {
        // this.dataSource.data = this.TREE_DATA;
        this.dataSource.data = this.DiagnosisData;
        debugger;
    }

    hasChild = (_: number, node: any) => node.expandable;

    setJobNames(job_name, id,parent) {
        debugger;
        this.callBackEvent.emit({
            job_name: job_name,
            jon_id: id,
            parent_id: parent
        });
    }

};