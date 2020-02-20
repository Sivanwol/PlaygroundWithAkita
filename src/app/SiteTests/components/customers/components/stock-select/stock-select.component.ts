import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import config from "../../config";
import { StockService } from "../../services/stock.service";
@Component({
  selector: "app-stock-select",
  templateUrl: "./stock-select.component.html",
  styleUrls: ["./stock-select.component.scss"]
})
export class StockSelectComponent implements OnInit {
  public stocks: Array<SelectItem> = [];
  public selectedStocks: Array<string> = [];
  constructor(private stockService: StockService) {}

  ngOnInit() {
    config.Symbols.forEach(item =>
      this.stocks.push({ label: item, value: item })
    );
  }

  onSelectChange($event) {
    this.stockService.requestNewStock($event);
  }
}
