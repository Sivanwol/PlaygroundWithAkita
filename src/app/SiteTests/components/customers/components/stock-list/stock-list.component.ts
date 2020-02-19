import { Component, OnInit } from "@angular/core";
import { Stock } from "../../models/stock.model";
import { SelectItem } from "primeng/api";

@Component({
  selector: "app-stock-list",
  templateUrl: "./stock-list.component.html",
  styleUrls: ["./stock-list.component.scss"]
})
export class StockListComponent implements OnInit {
  values: Stock[] = [];
  selectedItem: Stock;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  displayDialog: boolean;
  constructor() {}

  ngOnInit() {
    this.mockData();
    this.sortOptions = [
      { label: "Desc high Rate", value: "!high" },
      { label: "Asc high Rate", value: "high" },
      { label: "Desc low Rate", value: "!low" },
      { label: "Asc low Rate", value: "low" },
      { label: "Desc volume Rate", value: "!volume" },
      { label: "Asc volume Rate", value: "volume" }
    ];
  }

  onDialogHide() {
    this.selectedItem = null;
  }
  mockData() {
    for (let i = 1; i <= 40; i++) {
      const randSeed = Math.floor(Math.random() * 100) + 1;
      const randSeedChange = Number((Math.floor(Math.random() * 10) + 1).toFixed(2));
      const objSeed: Stock = {
        change: randSeedChange,
        changePresent: `${randSeedChange}%`,
        high: Number((randSeed * 2.4).toFixed(2)),
        low: Number((randSeed * 1.4).toFixed(2)),
        open: Number((randSeed * 1.8).toFixed(2)),
        stockCode: "APP",
        volume: randSeed * 8,
        lastUpdate: "12.2.2020"
      };
      this.values = [...this.values, objSeed];
    }
  }
  moreInfo($event, item: Stock) {
    this.selectedItem = item;
    this.displayDialog = true;
    $event.preventDefault();
  }
  goDeepInfo($event) {}
  removeItem($event, item: Stock) {}
  onSortChange($event) {
    const value = $event.value;

    if (value.indexOf("!") === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
